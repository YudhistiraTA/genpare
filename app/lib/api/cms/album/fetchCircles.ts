import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchCircles = unstable_cache(
	async () => {
		return await prisma.actor.findMany({
			where: { role: 'circle' },
			select: { id: true, name: true, slug: true },
		})
	},
	['circle'],
	{ tags: ['circle'], revalidate: 300 },
)
