import prisma from '@/prisma/config'

export async function fetchCircles() {
	return await prisma.actor.findMany({
		where: { role: 'circle' },
		select: { id: true, name: true, slug: true },
	})
}
