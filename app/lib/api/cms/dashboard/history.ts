import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchHistory = unstable_cache(
	async (page: number = 1) => {
		const [result, total] = await prisma.$transaction([
			prisma.history.findMany({
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * 10,
				take: 10,
			}),
			prisma.history.count(),
		])
		return {
			result: result.map((history) => ({
				...history,
				createdAt: history.createdAt.toISOString(),
			})),
			total,
		}
	},
	['history'],
	{
		tags: ['history'],
		revalidate: 300,
	},
)
