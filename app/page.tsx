import { getAlbum } from '@/app/lib/api/album'
import { Card } from '@/app/ui/card'
import Searchbar from '@/app/ui/searchbar'
import Link from 'next/link'

export default async function Page({
	searchParams: { query },
}: {
	searchParams: { query: string }
}) {
	const albums = await getAlbum(query)
	return (
		<main className="flex flex-col items-center justify-between px-2 lg:px-24">
			<Searchbar className="w-full" placeholder="Search..." />
			<section className="lg:flex grid lg:gap-8 gap-4 my-4">
				{albums.map((album) => (
					<Link
						key={album.id}
						href={`/album/${album.slug}`}
						className="hover:scale-105 transition-transform"
					>
						<Card
							slug={album.slug}
							imageUrl={album.imageUrl}
							title={album.name}
							body={album.releaseYear.toString()}
						/>
					</Link>
				))}
			</section>
		</main>
	)
}
