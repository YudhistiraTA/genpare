import prisma from '@/prisma/config'
import { Prisma } from '@prisma/client'
import { unstable_noStore } from 'next/cache'

export const filterOptions = [
	{ value: 'last-updated', label: 'Last Updated' },
	{ value: 'album-name-asc', label: 'Album Name (A-Z)' },
	{ value: 'album-name-desc', label: 'Album Name (Z-A)' },
	{ value: 'release-year-desc', label: 'Release Year (Newest)' },
	{ value: 'release-year-asc', label: 'Release Year (Oldest)' },
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
			return [{ updatedAt: { sort: 'desc', nulls: 'last' } }]
		default:
			return []
	}
}

export const fetchTableData = async ({
	query,
	year,
	order = 'last-updated',
}: {
	query: string
	year: string
	order: (typeof filterOptions)[number]['value']
}) => {
	unstable_noStore()
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
}
