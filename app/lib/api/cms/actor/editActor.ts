'use server'
import prisma from '@/prisma/config'
import { Role } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z
	.object({
		id: z.string().uuid(),
		name: z.string().min(1, 'Name is required.'),
		role: z.nativeEnum(Role, {
			errorMap: (issue) => {
				switch (issue.code) {
					case 'invalid_type':
					case 'invalid_enum_value':
						return { message: 'Please select a role.' }
					default:
						return { message: 'Unknown error.' }
				}
			},
		}),
		slug: z.string().min(1, 'Slug is required.'),
	})
	.refine(
		async (data) => {
			const { id, slug } = data
			return prisma.actor
				.findUnique({ where: { slug }, select: { id: true } })
				.then((actor) => actor?.id === id)
		},
		{ message: 'Slug is already in use.', path: ['slug'] },
	)
	.refine(
		async (data) => {
			const { id, name } = data
			return prisma.actor
				.findUnique({ where: { name }, select: { id: true } })
				.then((actor) => actor?.id === id || !actor)
		},
		{ message: 'Name is already in use.', path: ['name'] },
	)

export type State = {
	errors?: {
		name?: string[]
		role?: string[]
		slug?: string[]
	}
	message?: string | null
}

export async function editActor(prevState: State, formData: FormData) {
	const parsed = await FormSchema.safeParseAsync(
		Object.fromEntries(formData.entries()),
	)
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create actor.',
		}
	}
	const { id, name, role, slug } = parsed.data
	try {
		await prisma.$transaction(async (tx) => {
			await tx.actor.update({ where: { id }, data: { name, role, slug } })
			await tx.history.create({
				data: { message: `Edited actor ${name}.` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('actor')
	revalidateTag('history')
	switch (role) {
		case 'circle':
			revalidateTag('circle')
			break
		case 'translator':
			revalidateTag('translator')
			break
		default:
			revalidateTag('artist')
			break
	}
	redirect('/cms/actor')
}
