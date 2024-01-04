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
		id: z.string().uuid(),
		name: z.string().min(1, 'Name is required.'),
		slug: z.string().min(1, 'Slug is required.'),
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
		async ({ id, slug }) =>
			prisma.song
				.findUnique({ where: { slug }, select: { id: true } })
				.then((song) => !song || song?.id === id),
		{ message: 'Slug is already in use.', path: ['slug'] },
	)
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
			return !album.Song.some(
				(song) => song.trackNo === data.trackNo && song.id !== data.id,
			)
		},
		{ message: 'Track number is already in use.', path: ['trackNo'] },
	)
export type State = {
	errors?: {
		name?: string[]
	}
	message?: string | null
}

export async function editSong(prevState: State, formData: FormData) {
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
			await tx.song.update({
				where: { id: parsed.data.id },
				data: {
					...parsed.data,
					Vocals: {
						set: [],
						connect: parsed.data.Vocals.map((id) => ({ id })),
					},
					Composer: {
						set: [],
						connect: parsed.data.Composer.map((id) => ({ id })),
					},
				},
			})
			await tx.history.create({
				data: { message: `Edited song ${parsed.data.name}` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('song')
	redirect('/cms/song')
}
