'use server'
import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import prisma from '@/prisma/config'
import { revalidateTag } from 'next/cache'

export async function deleteAlbum({
	id,
	name,
}: Awaited<ReturnType<typeof fetchAlbum>>) {
	try {
		await prisma.$transaction(async (tx) => {
			await tx.album.delete({ where: { id } })
			await tx.history.create({
				data: { message: `Deleted album ${name}.` },
			})
		})
	} catch (error) {
		return { errors: {}, message: 'Internal Server Error' }
	}
	revalidateTag('album')
	revalidateTag('history')
	return { message: 'Deleted album.' }
}
