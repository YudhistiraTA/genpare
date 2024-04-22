import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getRecentChanges = unstable_cache(
	async (take: number) => {
		try {
			const res = await prisma.song.findMany({
				take,
        where: { updatedAt: { not: null } },
				orderBy: { updatedAt: 'desc' },
				select: {
					id: true,
					name: true,
					Album: { select: { name: true } },
					updatedAt: true,
          slug: true
				},
			})
			return res
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else throw new Error('Unknown Error')
		}
	},
	['song'],
	{
		tags: ['song'],
		revalidate: 300,
	},
)
