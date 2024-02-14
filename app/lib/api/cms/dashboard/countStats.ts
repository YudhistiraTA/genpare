import prisma from '@/prisma/config'
import { unstable_noStore } from 'next/cache'

export const fetchCountStats = async () => {
	unstable_noStore()
	const [result]: {
		album: bigint
		song: bigint
		actor: bigint
		artist: bigint
		translator: bigint
		circle: bigint
	}[] = await prisma.$queryRaw`
      SELECT
        (SELECT COUNT(*) FROM "Album") as album,
        (SELECT COUNT(*) FROM "Song") as song,
        (SELECT COUNT(*) FROM "Actor") as actor,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" NOT IN ('translator', 'circle')) as artist,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" = 'translator') as translator,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" = 'circle') as circle;
    `
	return {
		album: Number(result.album),
		song: Number(result.song),
		actor: Number(result.actor),
		artist: Number(result.artist),
		translator: Number(result.translator),
		circle: Number(result.circle),
	}
}
