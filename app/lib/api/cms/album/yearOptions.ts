import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchYearOptions = unstable_cache(
	async () => {
		const result: { release_year: number }[] =
			await prisma.$queryRaw`SELECT DISTINCT release_year FROM "Album"`
		return result.map(({ release_year }) => release_year)
	},
	['album'],
	{
		revalidate: 300,
		tags: ['album'],
	},
)
