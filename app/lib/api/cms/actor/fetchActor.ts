import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export async function fetchActor(slug: string) {
	unstable_noStore()
	try {
		const result = await prisma.actor.findUniqueOrThrow({ where: { slug } })
		return result
	} catch (error) {
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2025'
		)
			redirect('/cms/actor')
		else throw new Error('Unknown Error')
	}
}
