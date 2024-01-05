'use server'
import { capitalize } from '@/app/lib/capitalize'
import prisma from '@/prisma/config'
import { Language } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const japaneseLyricsCountCache = unstable_cache(
	async (id: string) => {
		const res = await prisma.lyrics.findUnique({
			where: { language_songId: { songId: id, language: Language.japanese } },
			select: { content: true },
		})
		if (!res) return res
		return res.content.split('\\n').length
	},
	['lyrics', 'song'],
	{ revalidate: 60, tags: ['lyrics', 'song'] },
)

const FormSchema = z
	.object({
		songName: z.string().nullish(),
		slug: z.string().nullish(),
		songId: z.string().uuid(),
		content: z
			.string()
			.min(1, 'Lyrics/translation is required.')
			.transform((v) => v.replace(/\r?\n/g, '\\n')),
		creatorId: z.string().min(1, 'Lyricist/translator is required.'),
		language: z.nativeEnum(Language, {
			errorMap: (issue) => {
				switch (issue.code) {
					case 'invalid_type':
					case 'invalid_enum_value':
						return { message: 'Please select a language.' }
					default:
						return { message: 'Unknown error.' }
				}
			},
		}),
	})
	.refine(
		async (data) => {
			const japaneseCount = await japaneseLyricsCountCache(data.songId)
			if (data.language === Language.japanese) return true
			return data.content.split('\\n').length === japaneseCount
		},
		{
			message: 'Number of lines must match the Japanese lyrics.',
			path: ['content'],
		},
	)

export type State = {
	errors?: {
		content?: string[]
		creatorId?: string[]
		language?: string[]
	}
	message?: string | null
}
export async function submitLyrics(prevState: State, formData: FormData) {
	const parsed = await FormSchema.safeParseAsync(
		Object.fromEntries(formData.entries()),
	)
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to submit lyrics.',
		}
	}
	const { content, creatorId, language, songId, slug, songName } = parsed.data
	try {
		await prisma.$transaction(async (tx) => {
			await tx.lyrics.upsert({
				where: { language_songId: { language, songId } },
				create: {
					content,
					creatorId,
					language,
					songId,
				},
				update: { content, creatorId },
			})
			await tx.history.create({
				data: {
					message: `Updated ${capitalize(language)} lyrics for ${songName}`,
				},
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('song')
	revalidateTag('lyrics')
	revalidateTag('history')
	redirect(`/cms/song/${slug}/lyrics`)
}

export async function deleteLyrics(id: string, language: Language, songName: string) {
	await prisma.$transaction(async (tx) => {
		await tx.lyrics.delete({ where: { id } })
		await tx.history.create({
			data: {
				message: `Deleted ${capitalize(language)} lyrics of ${songName}`,
			},
		})
	})
	revalidateTag('song')
	revalidateTag('lyrics')
	revalidateTag('history')
}
