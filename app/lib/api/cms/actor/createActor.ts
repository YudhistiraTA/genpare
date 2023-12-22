'use server'
import prisma from '@/prisma/config'
import { Role } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required.')
		.refine(
			async (name) =>
				prisma.actor.findUnique({ where: { name } }).then((actor) => !actor),
			'Name is already in use.',
		),
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
	slug: z
		.string()
		.min(1, 'Slug is required.')
		.refine(
			async (slug) =>
				prisma.actor.findUnique({ where: { slug } }).then((actor) => !actor),
			'Slug is already in use. If this was auto-generated, please use custom slug input.',
		),
})
export type State = {
	errors?: {
		name?: string[]
		role?: string[]
		slug?: string[]
	}
	message?: string | null
}
export async function createActor(prevState: State, formData: FormData) {
	const parsed = await FormSchema.safeParseAsync(
		Object.fromEntries(formData.entries()),
	)
	if (!parsed.success) {
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Failed to create actor.',
		}
	}
	const { name, role, slug } = parsed.data
	await prisma.$transaction(async (tx) => {
		await tx.actor.create({ data: { name, role, slug } })
		await tx.history.create({
			data: { message: `Created actor ${name} as ${role}.` },
		})
	})
	revalidateTag('actor')
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
