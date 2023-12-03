import { getAlbum } from '@/app/lib/api/album'
import { Card } from '@/app/ui/card'
import Link from 'next/link'

export async function MainPageCardWrapper({ query }: { query: string }) {
	const albums = await getAlbum(query)
	return (
		<section className="lg:flex grid lg:gap-8 gap-4 my-4 justify-center">
			{albums.map((album) => (
				<Link
					key={album.id}
					href={`/album/${album.slug}`}
					className="hover:scale-105 transition-transform"
				>
					<Card
						imageUrl={album.imageUrl}
						title={album.name}
						body={album.releaseYear.toString()}
					/>
				</Link>
			))}
		</section>
	)
}
