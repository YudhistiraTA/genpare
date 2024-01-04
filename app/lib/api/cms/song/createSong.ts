'use server'
import { youtubeIdExtract } from '@/app/lib/youtubeIdExtract'
import prisma from '@/prisma/config'
import { revalidateTag, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const albumCache = unstable_cache(
	async (id: string) =>
		await prisma.album.findUniqueOrThrow({
			where: { id },
			select: {
				totalTrack: true,
				Song: { select: { trackNo: true, id: true } },
			},
		}),
	['album'],
	{ tags: ['album'], revalidate: 60 },
)

const FormSchema = z
	.object({
		name: z.string().min(1, 'Name is required.'),
		slug: z
			.string()
			.min(1, 'Slug is required.')
			.refine(
				async (slug) =>
					prisma.song.findUnique({ where: { slug } }).then((song) => !song),
				'Slug is already in use. If this was auto-generated, please use custom slug input.',
			),
		youtubeId: z
			.string()
			.min(1, 'Youtube link is required.')
			.transform(youtubeIdExtract)
			.refine(
				async (id) => {
					const res = await fetch(
						`https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
						{ cache: 'no-cache' },
					)
					return res.ok
				},
				{ message: 'Youtube video is not available.', path: ['youtubeId'] },
			),
		trackNo: z
			.string()
			.min(1, 'Track number is required.')
			.transform(Number)
			.refine((number) => number > 0, 'Track number must be larger than 0.'),
		Vocals: z.array(z.string().uuid()),
		Composer: z.array(z.string().uuid()),
		albumId: z.string().uuid().min(1, 'Album is required.'),
	})
	.refine(
		async (data) => {
			const album = await albumCache(data.albumId)
			return data.trackNo <= album.totalTrack
		},
		{
			message: 'Track number is larger than album total track.',
			path: ['trackNo'],
		},
	)
	.refine(
		async (data) => {
			const album = await albumCache(data.albumId)
			return !album.Song.some((song) => song.trackNo === data.trackNo)
		},
		{ message: 'Track number is already in use.', path: ['trackNo'] },
	)

export type State = {
	errors?: {
		name?: string[]
	}
	message?: string | null
}

export async function createSong(prevState: State, formData: FormData) {
	const object = Object.fromEntries(formData.entries())
	const parsed = await FormSchema.safeParseAsync({
		...object,
		Vocals: formData.getAll('vocalists'),
		Composer: formData.getAll('composers'),
	})
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create song.',
		}
	}
	try {
		await prisma.$transaction(async (tx) => {
			await tx.song.create({
				data: {
					...parsed.data,
					Vocals: { connect: parsed.data.Vocals.map((id) => ({ id })) },
					Composer: { connect: parsed.data.Composer.map((id) => ({ id })) },
				},
			})
			await tx.history.create({
				data: { message: `Created song ${parsed.data.name}` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('song')
	revalidateTag('album')
	redirect(`/cms/song/${parsed.data.slug}?new=1`)
}
