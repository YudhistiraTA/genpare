import prisma from '@/prisma/config'
import { unstable_noStore } from 'next/cache'

export const fetchYearOptions = async () => {
	unstable_noStore()
	const result: { release_year: number }[] =
		await prisma.$queryRaw`SELECT DISTINCT release_year FROM "Album"`
	return result.map(({ release_year }) => release_year)
}
