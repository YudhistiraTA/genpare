import prisma from '@/prisma/config'
import { Language } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const fetchTableData = unstable_cache(
	async ({
		query,
		untranslated,
		orderType = 'albumName',
	}: {
		query?: string
		untranslated?: Language
		orderType?: 'albumName' | 'releaseYear' | 'latestEntry'
	}) => {
		const result = await prisma.song.findMany({
			orderBy:
				orderType === 'latestEntry'
					? { id: 'desc' }
					: [
							orderType === 'albumName'
								? { Album: { name: 'asc' } }
								: { Album: { releaseYear: 'asc' } },
							{ trackNo: 'asc' },
					  ],
			select: {
				id: true,
				name: true,
				slug: true,
				trackNo: true,
				youtubeId: true,
				Album: {
					select: {
						name: true,
						slug: true,
						totalTrack: true,
						releaseYear: true,
					},
				},
				Lyrics: {
					select: { language: true },
					where: { language: { notIn: ['japanese', 'romaji'] } },
				},
			},
			where: {
				...(untranslated && {
					NOT: { Lyrics: { some: { language: untranslated } } },
				}),
				...(query && {
					OR: [
						{ name: { contains: query, mode: 'insensitive' } },
						{ slug: { contains: query, mode: 'insensitive' } },
						{
							Album: { name: { contains: query, mode: 'insensitive' } },
						},
						{
							Album: { slug: { contains: query, mode: 'insensitive' } },
						},
					],
				}),
			},
		})
		return result
	},
	['song'],
	{
		tags: ['song'],
		revalidate: 300,
	},
)
