import prisma from '@/prisma/config'
import { unstable_cache } from 'next/cache'

export const fetchActors = unstable_cache(async () => {
	const actors = await prisma.actor.findMany({
		where: {
			OR: [{ role: 'translator' }, { role: 'lyricist' }, { role: 'composer' }],
		},
		select: { id: true, name: true, slug: true, role: true },
	})
	const translators = actors.filter((actor) => actor.role === 'translator')
	const lyricists = actors.filter(
		(actor) => actor.role === 'lyricist' || actor.role === 'composer',
	)
	return { translators, lyricists }
})
