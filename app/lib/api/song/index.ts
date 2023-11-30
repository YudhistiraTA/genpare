import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getSongBySlug = unstable_cache(
	async (slug: string) => {
		try {
			const song = await prisma.song.findUniqueOrThrow({
				where: { slug },
				include: {
					Lyrics: { include: { createdBy: true } },
					Album: { include: { Circle: true } },
					Vocals: true,
					Composer: true,
				},
			})
			return song
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else throw new Error('Unknown Error')
		}
	},
	['song'],
	{
		tags: ['song'],
		revalidate: 300,
	},
)
