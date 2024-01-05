'use server'
import { fetchSong } from '@/app/lib/api/cms/song/fetchSong'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteSong({
	id,
	name,
}: Awaited<ReturnType<typeof fetchSong>>) {
	try {
		await prisma.$transaction(async (tx) => {
			await tx.song.delete({ where: { id } })
			await tx.history.create({
				data: { message: `Deleted song ${name}.` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('album')
	revalidateTag('song')
	revalidateTag('history')
  redirect('/cms/song')
}
