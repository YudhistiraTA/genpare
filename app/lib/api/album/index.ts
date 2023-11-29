import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

export const getAlbum = unstable_cache(
	async () => {
		const albums = await prisma.album.findMany()
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
				include: { Song: true },
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
