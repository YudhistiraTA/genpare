import prisma from '@/prisma/config'
import { Language, Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const filterOptions = [
	{ value: 'album-name-asc', label: 'Album Name (A-Z)' },
	{ value: 'album-name-desc', label: 'Album Name (Z-A)' },
	{ value: 'release-year-desc', label: 'Release Year (Newest)' },
	{ value: 'release-year-asc', label: 'Release Year (Oldest)' },
] as const

const getOrderBy = (
	order: (typeof filterOptions)[number]['value'],
): Prisma.SongOrderByWithRelationInput[] => {
	switch (order) {
		case 'album-name-asc':
			return [{ Album: { name: 'asc' } }, { trackNo: 'asc' }]
		case 'album-name-desc':
			return [{ Album: { name: 'desc' } }, { trackNo: 'asc' }]
		case 'release-year-asc':
			return [{ Album: { releaseYear: 'asc' } }, { trackNo: 'asc' }]
		case 'release-year-desc':
			return [{ Album: { releaseYear: 'desc' } }, { trackNo: 'asc' }]
		default:
			return []
	}
}

export const fetchTableData = unstable_cache(
	async ({
		query,
		untranslated,
		order = 'album-name-asc',
	}: {
		query?: string
		untranslated?: Language
		order?: (typeof filterOptions)[number]['value']
	}) => {
		const result = await prisma.song.findMany({
			orderBy: getOrderBy(order),
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
