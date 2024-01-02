import prisma from '@/prisma/config'
import { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const filterOptions = [
	{ value: 'last-updated', label: 'Last updated' },
	{ value: 'album-name-asc', label: 'Album name (A-Z)' },
	{ value: 'album-name-desc', label: 'Album name (Z-A)' },
	{ value: 'release-year-desc', label: 'Release year (Newest)' },
	{ value: 'release-year-asc', label: 'Release year (Oldest)' },
] as const

const getOrderBy = (
	order: (typeof filterOptions)[number]['value'],
): Prisma.AlbumOrderByWithRelationInput[] => {
	switch (order) {
		case 'album-name-asc':
			return [{ name: 'asc' }]
		case 'album-name-desc':
			return [{ name: 'desc' }]
		case 'release-year-desc':
			return [{ releaseYear: 'desc' }]
		case 'release-year-asc':
			return [{ releaseYear: 'asc' }]
		case 'last-updated':
			return [{ updatedAt: {sort:'desc', nulls:'last'} }]
		default:
			return []
	}
}

export const fetchTableData = unstable_cache(
	async ({
		query,
		year,
		order = 'last-updated',
	}: {
		query: string
		year: string
		order: (typeof filterOptions)[number]['value']
	}) => {
		const result = await prisma.album.findMany({
			orderBy: getOrderBy(order),
			select: {
				id: true,
				name: true,
				slug: true,
				Circle: { select: { name: true } },
				imageUrl: true,
				totalTrack: true,
				releaseYear: true,
				_count: { select: { Song: true } },
				updatedAt: true,
			},
			where: {
				...(query && {
					OR: [
						{ name: { contains: query, mode: 'insensitive' } },
						{ slug: { contains: query, mode: 'insensitive' } },
						{ Circle: { name: { contains: query, mode: 'insensitive' } } },
					],
				}),
				...(year && { releaseYear: parseInt(year) }),
			},
		})
		return result
	},
	['album'],
	{
		revalidate: 300,
		tags: ['album'],
	},
)
