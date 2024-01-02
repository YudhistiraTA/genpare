import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export async function fetchAlbum(slug: string) {
	unstable_noStore()
	try {
		const result = await prisma.album.findUniqueOrThrow({
			where: { slug },
			include: {
				Song: {
					select: {
						id: true,
						name: true,
						Lyrics: { select: { language: true } },
					},
					orderBy: { trackNo: 'asc' },
				},
			},
		})
		return result
	} catch (error) {
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2025'
		)
			redirect('/cms/album')
		else throw new Error('Unknown Error')
	}
}
