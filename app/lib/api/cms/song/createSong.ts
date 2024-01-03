'use server'
import { youtubeIdExtract } from '@/app/lib/youtubeIdExtract'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'


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
})

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
	console.log(parsed.data)
	try {
		await prisma.song.create({
			data: {
				...parsed.data,
				Vocals: { connect: parsed.data.Vocals.map((id) => ({ id })) },
				Composer: { connect: parsed.data.Composer.map((id) => ({ id })) },
			},
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('song')
	redirect('/cms/song')
}
