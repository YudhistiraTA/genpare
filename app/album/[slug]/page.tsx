import { getAlbumBySlug } from '@/app/lib/api/album'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const album = await getAlbumBySlug(slug)
	return (
		<section>
			{album.Song.map((item) => (
				<Link key={item.id} href={`/song/${item.slug}`}>
					<Suspense fallback={<p>loading</p>}>
						<Image
							src={album.imageUrl}
							alt={item.name}
							width={200}
							height={200}
						/>
					</Suspense>
					{item.name}
				</Link>
			))}
		</section>
	)
}
