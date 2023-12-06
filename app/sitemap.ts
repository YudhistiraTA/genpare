import prisma from '@/prisma/config'
import { Role } from '@prisma/client'
import { MetadataRoute } from 'next'

enum Path {
	album = 'album',
	song = 'song',
	artist = 'artist',
	translator = 'translator',
	circle = 'circle',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const root = 'https://gengo-parade.com'
	const result: {
		entity: 'Album' | 'Song' | 'Actor'
		slug: string
		role?: Role
	}[] = await prisma.$queryRaw`
    SELECT 'Album' as entity, slug, (SELECT NULL::"Role") as role FROM "Album"
    UNION ALL
    SELECT 'Song' as entity, slug, (SELECT NULL::"Role") as role FROM "Song"
    UNION ALL
    SELECT 'Actor' as entity, slug, role FROM "Actor"
  `
	const roleMap = new Map<Role, Path>([
		[Role.circle, Path.circle],
		[Role.vocalist, Path.artist],
		[Role.lyricist, Path.artist],
		[Role.composer, Path.artist],
		[Role.translator, Path.translator],
	] as [Role, Path][])
	return [
		{
			url: root,
			lastModified: new Date(),
		},
		...result.map(({ entity, slug, role }) => ({
			url: `${root}/${
				role ? (roleMap.get(role) as Path) : (entity.toLowerCase() as Path)
			}/${slug}`,
			lastModified: new Date(),
		})),
	]
}
