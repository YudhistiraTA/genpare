import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getArtist = unstable_cache(
	async (slug: string) => {
		try {
			const actor = prisma.actor.findUniqueOrThrow({
				where: { slug: slug },
			})

			const albums = prisma.album.findMany({
				where: {
					Song: {
						some: {
							OR: [
								{ Composer: { some: { slug: slug } } },
								{
									Lyrics: {
										some: {
											AND: [{ createdBy: { slug } }, { language: 'japanese' }],
										},
									},
								},
								{ Vocals: { some: { slug } } },
							],
						},
					},
				},
				include: {
					Song: {
						where: {
							OR: [
								{ Composer: { some: { slug: slug } } },
								{
									Lyrics: {
										some: {
											AND: [{ createdBy: { slug } }, { language: 'japanese' }],
										},
									},
								},
								{ Vocals: { some: { slug } } },
							],
						},
						include: {
							Lyrics: {
								where: {
									AND: [{ createdBy: { slug } }, { language: 'japanese' }],
								},
								select: { id: true },
							},
							Composer: { where: { slug: slug }, select: { id: true } },
							Vocals: { where: { slug: slug }, select: { id: true } },
						},
					},
				},
			})

			const result = await prisma.$transaction([actor, albums])
			return result
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else {
				console.log(error)
				throw new Error('Unknown Error')
			}
		}
	},
	['artist'],
	{ revalidate: 300, tags: ['artist'] },
)
