'use server'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import slug from 'slug'
import { z } from 'zod'

const FormSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required.')
		.refine(
			async (name) =>
				prisma.album.findUnique({ where: { name } }).then((album) => !album),
			'Name is already in use.',
		),
	circleId: z
		.string({
			invalid_type_error: 'Circle is required.',
			required_error: 'Circle is required.',
		})
		.min(1, 'Circle is required.')
		.uuid(),
	slug: z
		.string()
		.min(1, 'Slug is required.')
		.refine(
			async (slug) =>
				prisma.album.findUnique({ where: { slug } }).then((album) => !album),
			'Slug is already in use. If this was auto-generated, please use custom slug input.',
		),
	releaseYear: z.string().min(1, 'Release year is required.').transform(Number),
	totalTrack: z.string().min(1, 'Total track is required.').transform(Number),
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, 'Image is required.'),
})
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

export async function createAlbum(prevState: State, formData: FormData) {
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
		const blob = new Blob([parsed.data.image], { type: parsed.data.image.type })
		const uploadResponse = await fetch(uploadURL, {
			method: 'PUT',
			body: blob,
		})
		if (uploadResponse.status !== 200)
			return { errors: {}, message: 'Failed to upload image.' }
		await prisma.$transaction(async (tx) => {
			await tx.album.create({
				data: {
					name: parsed.data.name,
					slug: parsed.data.slug,
					Circle: {
						connect: { id: parsed.data.circleId },
					},
					releaseYear: parsed.data.releaseYear,
					totalTrack: parsed.data.totalTrack,
					imageUrl: process.env.CDN_ENDPOINT + '/' + Key,
				},
			})
			await tx.history.create({
				data: { message: `Created album ${parsed.data.name}.` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('album')
	revalidateTag('history')
	redirect('/cms/album')
}
