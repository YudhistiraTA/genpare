'use server'
import prisma from '@/prisma/config'
import { revalidateTag, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const cachedAlbum = unstable_cache(
	async (id: string) =>
		await prisma.album.findUniqueOrThrow({
			where: { id },
			select: {
				_count: { select: { Song: true } },
				Song: { select: { trackNo: true } },
			},
		}),
)

const FormSchema = z
	.object({
		id: z.string().uuid(),
		name: z.string().min(1, 'Name is required.'),
		circleId: z
			.string({
				invalid_type_error: 'Circle is required.',
				required_error: 'Circle is required.',
			})
			.min(1, 'Circle is required.'),
		slug: z.string().min(1, 'Slug is required.'),
		releaseYear: z
			.string()
			.min(1, 'Release year is required.')
			.transform(Number)
			.refine((year) => year > 0, 'Release year must be larger than 0.')
			.refine(
				(year) => year <= new Date().getFullYear(),
				'Maximum release year is current year.',
			),
		totalTrack: z
			.string()
			.min(1, 'Total track is required.')
			.transform(Number)
			.refine((track) => track > 0, 'Total track must be larger than 0.'),
		image: z.instanceof(File).nullish(),
	})
	.refine(
		async ({ id, name }) =>
			prisma.album
				.findUnique({ where: { name }, select: { id: true } })
				.then((album) => !album || album?.id === id),
		{ message: 'Name is already in use.', path: ['name'] },
	)
	.refine(
		async ({ id, slug }) =>
			prisma.album
				.findUnique({ where: { slug }, select: { id: true } })
				.then((album) => !album || album?.id === id),
		{ message: 'Slug is already in use.', path: ['slug'] },
	)
	.refine(
		async ({ id, totalTrack }) =>
			cachedAlbum(id).then(
				(album) => !album?._count.Song || album?._count.Song <= totalTrack,
			),
		{
			message: 'This album has more translated songs than the new total track.',
			path: ['totalTrack'],
		},
	)
	.refine(
		async ({ id, totalTrack }) =>
			cachedAlbum(id).then(
				(album) => !album?.Song.some((song) => song.trackNo > totalTrack),
			),
		{
			message:
				'This album has songs with track number larger than the new total track.',
			path: ['totalTrack'],
		},
	)

export type State = {
	errors?: {
		name?: string[]
		circleId?: string[]
		slug?: string[]
		releaseYear?: string[]
		totalTrack?: string[]
		image?: string[]
	}
	message?: string | null
}

export async function editAlbum(prevState: State, formData: FormData) {
	const parsed = await FormSchema.safeParseAsync(
		Object.fromEntries(formData.entries()),
	)
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create album.',
		}
	}
	try {
		let key: string | null = null
		if (parsed.data.image && parsed.data.image.size > 0) {
			const fileExt = '.' + parsed.data.image.name.split('.')[1]
			const presignedUrlResponse = await fetch(
				process.env.API_ENDPOINT +
					'/getPresignedUrl' +
					`?fileName=${parsed.data.slug + fileExt}&fileType=${
						parsed.data.image.type
					}`,
				{ cache: 'no-store' },
			)
			const jsonResponse = await presignedUrlResponse.json()
			const { uploadURL, Key } = jsonResponse as {
				uploadURL: string
				Key: string
			}
			key = Key
			const blob = new Blob([parsed.data.image], {
				type: parsed.data.image.type,
			})
			const uploadResponse = await fetch(uploadURL, {
				method: 'PUT',
				body: blob,
			})
			if (uploadResponse.status !== 200)
				return { errors: {}, message: 'Failed to upload image.' }
		}
		await prisma.$transaction(async (tx) => {
			await tx.album.update({
				where: { id: parsed.data.id },
				data: {
					name: parsed.data.name,
					slug: parsed.data.slug,
					Circle: {
						connect: { id: parsed.data.circleId },
					},
					releaseYear: parsed.data.releaseYear,
					totalTrack: parsed.data.totalTrack,
					...(key && { imageUrl: process.env.CDN_ENDPOINT + '/' + key }),
				},
			})
			await tx.history.create({
				data: { message: `Edited album ${parsed.data.name}.` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('album')
	revalidateTag('history')
	redirect('/cms/album')
}
