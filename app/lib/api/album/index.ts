import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getAlbum = unstable_cache(
	async (query?: string) => {
		const albums = await prisma.album.findMany({
			...(query && {
				where: {
					OR: [
						{
							Circle: {
								OR: [
									{ name: { contains: query, mode: 'insensitive' } },
									{ slug: { contains: query, mode: 'insensitive' } },
								],
							},
						},
						{ name: { contains: query, mode: 'insensitive' } },
						{
							releaseYear: {
								equals: !isNaN(Number(query)) ? Number(query) : undefined,
							},
						},
						{
							Song: {
								some: {
									OR: [
										{ name: { contains: query, mode: 'insensitive' } },
										{ slug: { contains: query, mode: 'insensitive' } },
										{
											Composer: {
												some: {
													OR: [
														{ name: { contains: query, mode: 'insensitive' } },
														{ slug: { contains: query, mode: 'insensitive' } },
													],
												},
											},
										},
										{
											Vocals: {
												some: {
													OR: [
														{ name: { contains: query, mode: 'insensitive' } },
														{ slug: { contains: query, mode: 'insensitive' } },
													],
												},
											},
										},
									],
								},
							},
						},
					],
				},
			}),
		})
		return albums
	},
	['album'],
	{
		tags: ['album'],
		revalidate: 300,
	},
)

export const getAlbumBySlug = unstable_cache(
	async (slug: string) => {
		try {
			const album = await prisma.album.findUniqueOrThrow({
				where: { slug },
				include: {
					Song: {
						select: {
							id: true,
							name: true,
							slug: true,
							trackNo: true,
							Lyrics: { select: { id: true, language: true, createdBy: true } },
							Composer: true,
							Vocals: true,
						},
						orderBy: { trackNo: 'asc' },
					},
					Circle: true,
				},
			})
			return album
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			)
				notFound()
			else throw new Error('Unknown Error')
		}
	},
	['album'],
	{
		tags: ['album'],
		revalidate: 300,
	},
)
