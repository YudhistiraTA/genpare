import prisma from '@/prisma/config'

export async function fetchCountStats() {
  const [result]: { album: bigint; song: bigint; actor: bigint; translator: bigint; circle: bigint }[] =
    await prisma.$queryRaw`
      SELECT
        (SELECT COUNT(*) FROM "Album") as album,
        (SELECT COUNT(*) FROM "Song") as song,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" NOT IN ('translator', 'circle')) as actor,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" = 'translator') as translator,
        (SELECT COUNT(*) FROM "Actor" WHERE "role" = 'circle') as circle;
    `
  return result
}