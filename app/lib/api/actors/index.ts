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
				throw new Error('Unknown Error')
			}
		}
	},
	['artist'],
	{ revalidate: 300, tags: ['artist'] },
)

export const getCircle = unstable_cache(
	async (slug: string) => {
		try {
			const circle = prisma.actor.findUniqueOrThrow({
				where: { slug: slug },
			})

			const albums = prisma.album.findMany({
				where: { Circle: { slug } },
			})

			const result = await prisma.$transaction([circle, albums])
			return result
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else {
				throw new Error('Unknown Error')
			}
		}
	},
	['circle'],
	{ revalidate: 300, tags: ['circle'] },
)

export const getTranslator = unstable_cache(
	async (slug: string) => {
		try {
			const translator = prisma.actor.findUniqueOrThrow({
				where: { slug: slug },
			})

			const albums = prisma.album.findMany({
				where: {
					Song: {
						some: {
							Lyrics: {
								some: {
									createdBy: { slug },
								},
							},
						},
					},
				},
				include: {
					Song: {
						where: {
							Lyrics: {
								some: {
									createdBy: { slug },
								},
							},
						},
						include: {
							Lyrics: {
								where: {
									createdBy: { slug },
								},
								select: { id: true, language: true },
							},
						},
					},
				},
			})

			const result = await prisma.$transaction([translator, albums])
			return result
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else {
				throw new Error('Unknown Error')
			}
		}
	},
	['translator'],
	{ revalidate: 300, tags: ['translator'] },
)
