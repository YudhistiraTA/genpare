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
					Album: {
						include: {
							Circle: true,
							Song: {
								include: { Lyrics: { select: { language: true } } },
								orderBy: { trackNo: 'asc' },
							},
						},
					},
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

export const getSongsGroupedByAlbum = unstable_cache(
	async (query: string) => {
		try {
			const song = await prisma.album.findMany({
				where: {
					...(query && {
						OR: [
							{ name: { contains: query, mode: 'insensitive' } },
							{
								slug: {
									contains: query.replaceAll(' ', '-'),
									mode: 'insensitive',
								},
							},
							{
								Circle: {
									OR: [
										{ name: { contains: query, mode: 'insensitive' } },
										{
											slug: {
												contains: query.replaceAll(' ', '-'),
												mode: 'insensitive',
											},
										},
									],
								},
							},
							{
								Song: {
									some: {
										OR: [
											{ name: { contains: query, mode: 'insensitive' } },
											{
												slug: {
													contains: query.replaceAll(' ', '-'),
													mode: 'insensitive',
												},
											},
											{
												Composer: {
													some: {
														OR: [
															{
																name: { contains: query, mode: 'insensitive' },
															},
															{
																slug: {
																	contains: query.replaceAll(' ', '-'),
																	mode: 'insensitive',
																},
															},
														],
													},
												},
											},
											{
												Vocals: {
													some: {
														OR: [
															{
																name: { contains: query, mode: 'insensitive' },
															},
															{
																slug: {
																	contains: query.replaceAll(' ', '-'),
																	mode: 'insensitive',
																},
															},
														],
													},
												},
											},
										],
									},
								},
							},
						],
					}),
				},
				orderBy: { releaseYear: 'desc' },
				select: {
					id: true,
					name: true,
					releaseYear: true,
					slug: true,
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
					Circle: { select: { name: true } },
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
