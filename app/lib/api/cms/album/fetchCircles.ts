import prisma from '@/prisma/config'
import { unstable_noStore } from 'next/cache'

export const fetchCircles = async () => {
	unstable_noStore()
	return await prisma.actor.findMany({
		where: { role: 'circle' },
		select: { id: true, name: true, slug: true },
	})
}
