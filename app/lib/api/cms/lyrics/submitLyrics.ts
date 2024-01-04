import { Language } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
	slug: z.string(),
	songId: z.string().uuid(),
	content: z.string().min(1, 'Lyrics is required.'),
	creatorId: z.string().uuid().min(1, 'Lyricist/translator is required.'),
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
	const { slug } = parsed.data
	try {
		// await prisma.$transaction(async (tx) => {
		//   await tx.lyrics.upsert({
		//     where: { id },
		//     create: { content, creatorId, language, Song: { connect: { id: songId } } },
		//     update: { content, creatorId, language },
		//   })
		//   await tx.history.create({
		//     data: { message: `Updated lyrics for ${songId}` },
		//   })
		// })
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('song')
	redirect(`/cms/song/${slug}/lyrics`)
}
