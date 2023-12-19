import prisma from '@/prisma/config'
import { Language } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const fetchLanguageStats = unstable_cache(
	async () => {
    // Add a 5 seconds delay
		const result: { language: Language; count: bigint }[] =
			await prisma.$queryRaw`
      SELECT 
        l1.language, 
        (SELECT COUNT(*) FROM "Lyrics" WHERE language = 'japanese') - l1._count AS count
      FROM 
        (SELECT language, COUNT(*) AS _count FROM "Lyrics" GROUP BY language) AS l1
    `
		return result.map(({ language, count }) => ({
			language,
			count: Number(count),
		}))
	},
	['song'],
	{
		tags: ['song'],
		revalidate: 300,
	},
)
