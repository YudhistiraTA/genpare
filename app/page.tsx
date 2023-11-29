import { getAlbum } from '@/app/lib/api/album'
import { Suggestbar } from '@/app/ui/suggestbar'
import Link from 'next/link'

export default async function Home() {
	const albums = await getAlbum()
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Suggestbar />
			{albums.map((album) => (
				<Link key={album.id} href={`/album/${album.slug}`}>
					<p>{JSON.stringify(album)}</p>
				</Link>
			))}
		</main>
	)
}
