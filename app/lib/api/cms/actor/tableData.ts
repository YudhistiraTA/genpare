import prisma from '@/prisma/config'
import { Prisma } from '@prisma/client'
import { unstable_noStore } from 'next/cache'

export const filterOptions = [
	{ value: 'last-updated', label: 'Last Updated' },
	{ value: 'actor-name-asc', label: 'Actor Name (A-Z)' },
	{ value: 'actor-name-desc', label: 'Actor Name (Z-A)' },
] as const

export const roleOptions = ['circle', 'artist', 'translator'] as const
export type RoleOptions = (typeof roleOptions)[number]

const getOrderBy = (
	order: (typeof filterOptions)[number]['value'],
): Prisma.ActorOrderByWithRelationInput[] => {
	switch (order) {
		case 'actor-name-asc':
			return [{ name: 'asc' }]
		case 'actor-name-desc':
			return [{ name: 'desc' }]
		case 'last-updated':
			return [{ updatedAt: { sort: 'desc', nulls: 'last' } }]
		default:
			return []
	}
}

const getRoleFilter = (role: RoleOptions): Prisma.ActorWhereInput => {
	switch (role) {
		case 'circle':
			return { role: 'circle' }
		case 'artist':
			return { role: { notIn: ['circle', 'translator'] } }
		case 'translator':
			return { role: 'translator' }
		default:
			return {}
	}
}

export const fetchTableData = async ({
	query,
	order = 'last-updated',
	role,
}: {
	query: string
	order: (typeof filterOptions)[number]['value']
	role: RoleOptions
}) => {
	unstable_noStore()
	const result = await prisma.actor.findMany({
		orderBy: getOrderBy(order),
		select: {
			id: true,
			name: true,
			slug: true,
			role: true,
			updatedAt: true,
		},
		where: {
			...(role && getRoleFilter(role)),
			...(query && {
				OR: [
					{ name: { contains: query, mode: 'insensitive' } },
					{ slug: { contains: query, mode: 'insensitive' } },
				],
			}),
		},
	})
	return result
}
