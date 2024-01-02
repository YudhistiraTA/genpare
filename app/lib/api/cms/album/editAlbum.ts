'use server'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'
import slug from 'slug'
import { z } from 'zod'

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
			.transform(Number),
		totalTrack: z.string().min(1, 'Total track is required.').transform(Number),
		image: z.instanceof(File).nullish(),
	})
	.refine(
		async ({ id, name }) =>
			prisma.album
				.findUnique({ where: { name }, select: { id: true } })
				.then((actor) => !actor || actor?.id === id),
		{ message: 'Name is already in use.', path: ['name'] },
	)
	.refine(
		async ({ id, slug }) =>
			prisma.album
				.findUnique({ where: { slug }, select: { id: true } })
				.then((actor) => !actor || actor?.id === id),
		{ message: 'Slug is already in use.', path: ['slug'] },
	)
	.refine(
		async ({ id, totalTrack }) =>
			prisma.album
				.findUnique({
					where: { id },
					select: { _count: { select: { Song: true } } },
				})
				.then(
					(album) => !album?._count.Song || album?._count.Song <= totalTrack,
				),
		{
			message: 'This album has more translated songs than the new total track.',
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
			const fileName =
				slug(parsed.data.image.name.split('.')[0]) +
				'.' +
				parsed.data.image.name.split('.')[1]
			const presignedUrlResponse = await fetch(
				process.env.API_ENDPOINT +
					'/getPresignedUrl' +
					`?fileName=${fileName}&fileType=${parsed.data.image.type}`,
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
