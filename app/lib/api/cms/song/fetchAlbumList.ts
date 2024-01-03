import prisma from '@/prisma/config'

export async function fetchAlbumList() {
	return await prisma.album.findMany({ select: { id: true, name: true } })
}
