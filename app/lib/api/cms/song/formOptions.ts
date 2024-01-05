import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchFormOptions = unstable_cache(
	async () => {
		const actors = await prisma.actor.findMany({
			select: { id: true, name: true, slug: true, role: true },
			where: { role: { not: 'circle' } },
		})
		const albums = await prisma.album.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				totalTrack: true,
				_count: {select: {Song: true}}}
		})

		const vocals = actors.filter((actor) => actor.role === 'vocalist')
		const composers = actors.filter((actor) => actor.role === 'composer')
		const translators = actors.filter((actor) => actor.role === 'translator')
		const lyricists = actors.filter(
			(actor) => actor.role === 'lyricist' || actor.role === 'composer',
		)
		const cleanedAlbums = albums.map((album) => {
			const {_count,totalTrack, ...rest} = album
			return { ...rest, disabled: totalTrack === _count.Song }
		})
		return { albums:cleanedAlbums, vocals, composers, translators, lyricists }
	},
	['actor', 'album'],
	{ tags: ['actor', 'album'], revalidate: 300 },
)
