import prisma from '@/prisma/config'
import { unstable_noStore } from 'next/cache'

export const fetchHistory = async (page: number = 1) => {
	unstable_noStore()
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
}
