import prisma from '@/prisma/config'
import { Role } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
	name: z.string().min(1),
	role: z.nativeEnum(Role),
	slug: z.string().min(1),
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
	const parsed = FormSchema.safeParse(Object.fromEntries(formData.entries()))
	if (!parsed.success)
		return {
			errors: parsed.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to create actor.',
		}
	const { name, role, slug } = parsed.data
  console.log({ name, role, slug })
	// await prisma.actor.create({ data: { name, role, slug } })
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
