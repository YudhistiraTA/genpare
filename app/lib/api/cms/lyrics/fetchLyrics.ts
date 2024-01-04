import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export async function fetchLyrics(slug: string) {
	unstable_noStore()
	try {
		return await prisma.song.findUniqueOrThrow({
			where: { slug },
			select: {
				Lyrics: {
					select: { content: true, creatorId: true, id: true, language: true },
				},
				id: true,
				name: true,
			},
		})
	} catch (error) {
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2025'
		)
			redirect('/cms/song')
		else throw new Error('Unknown Error')
	}
}
