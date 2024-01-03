import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchFormOptions = unstable_cache(
	async () => {
		const actors = await prisma.actor.findMany({
			select: { id: true, name: true, slug: true, role: true },
			where: { role: { not: 'circle' } },
		})
		const albums = await prisma.album.findMany({
			select: { id: true, name: true, slug: true },
		})

		const vocals = actors.filter((actor) => actor.role === 'vocalist')
		const composers = actors.filter((actor) => actor.role === 'composer')
		const translators = actors.filter((actor) => actor.role === 'translator')
		const lyricists = actors.filter(
			(actor) => actor.role === 'lyricist' || actor.role === 'composer',
		)

		return { albums, vocals, composers, translators, lyricists }
	},
	['actor'],
	{ tags: ['actor'], revalidate: 300 },
)
