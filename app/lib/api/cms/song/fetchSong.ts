import prisma from '@/prisma/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export async function fetchSong(slug: string) {
	unstable_noStore()
	try {
		const result = await prisma.song.findUniqueOrThrow({
			where: { slug },
			include: {
				Album: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
				Composer: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
				Vocals: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
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
