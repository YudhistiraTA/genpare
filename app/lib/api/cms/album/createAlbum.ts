'use server'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
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
		.string({invalid_type_error: 'Circle is required.', required_error: 'Circle is required.'})
		.min(1, 'Circle is required.')
		.refine(
			async (circleId) =>
				prisma.actor
					.findUnique({ where: { id: circleId }, select: { role: true } })
					.then((circle) => !!circle && circle.role === 'circle'),
			'Circle does not exist.',
		),
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
	image: z.instanceof(File).refine((file) => file.size > 0, 'Image is required.')
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
	console.log(Object.fromEntries(formData.entries()))
	const parsed = await FormSchema.safeParseAsync(
		Object.fromEntries(formData.entries()),
	)
	if (!parsed.success) {
    console.log(parsed.error.flatten())
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create album.',
		}
	}
	const { name, slug, circleId, releaseYear } = parsed.data
	try {
		// await prisma.$transaction(async (tx) => {
		// 	await tx.actor.create({ data: { name, role, slug } })
		// 	await tx.history.create({
		// 		data: { message: `Created album ${name} as ${role}.` },
		// 	})
		// })
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('album')
	redirect('/cms/album')
}
