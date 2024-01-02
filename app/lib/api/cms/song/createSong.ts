'use server'
import { youtubeIdExtract } from '@/app/lib/youtubeIdExtract'
import prisma from '@/prisma/config'
import { Language } from '@prisma/client'
import { z } from 'zod'

function lineNumCheck(arr: { content: string }[]) {
	const linesCount = arr[0].content.split('\n').length
	return arr.every((item) => item.content.split('\n').length === linesCount)
}

const FormSchema = z.object({
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
	trackNo: z.string().min(1, 'Track number is required.').transform(Number),
	Vocals: z.array(z.string().uuid()),
	Composer: z.array(z.string().uuid()),
	albumId: z.string().uuid().min(1, 'Album is required.'),
	lyrics: z
		.array(
			z.object({
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
				content: z.string(),
				creatorId: z.string().uuid(),
			}),
		)
		.min(1, 'Lyrics is required.')
		.refine(lineNumCheck, {
			message: 'All lyrics must have the same number of lines.',
			path: ['lyrics'],
		}),
})

export type State = {
	errors?: {
		name?: string[]
	}
	message?: string | null
}

export async function createSong(prevState: State, formData: FormData) {
	const object = Object.fromEntries(formData.entries())
	console.log(object)
	const parsed = await FormSchema.safeParseAsync(object)
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create song.',
		}
	}
	return { errors: {}, message: 'test' }
}
