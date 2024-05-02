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
				orderBy: { releaseYear: 'desc' },
				select: {
					id: true,
					name: true,
					releaseYear: true,
					slug: true,
					Circle: { select: { name: true } },
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
						select: {
							id: true,
							name: true,
							slug: true,
							Lyrics: {
								select: {
									language: true,
									createdBy: { select: { name: true } },
								},
							},
							Composer: { select: { name: true } },
						},
						orderBy: { trackNo: 'asc' },
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
				select: { name: true, slug: true },
			})

			const albums = prisma.album.findMany({
				where: { Circle: { slug } },
				orderBy: { releaseYear: 'desc' },
				select: {
					id: true,
					name: true,
					releaseYear: true,
					slug: true,
					Circle: { select: { name: true } },
					Song: {
						select: {
							id: true,
							name: true,
							slug: true,
							Lyrics: {
								select: {
									language: true,
									createdBy: { select: { name: true } },
								},
							},
							Composer: { select: { name: true } },
						},
						orderBy: { trackNo: 'asc' },
					},
				},
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
				select: { name: true, slug: true },
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
				select: {
					id: true,
					name: true,
					releaseYear: true,
					slug: true,
					Circle: { select: { name: true } },
					Song: {
						where: {
							Lyrics: {
								some: {
									createdBy: { slug },
								},
							},
						},
						select: {
							id: true,
							name: true,
							slug: true,
							Lyrics: {
								select: {
									language: true,
									createdBy: { select: { name: true } },
								},
							},
							Composer: { select: { name: true } },
						},
						orderBy: { trackNo: 'asc' },
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
