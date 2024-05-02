import { getAlbum } from '@/app/lib/api/album'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumItem({
	album,
}: {
	album: Awaited<ReturnType<typeof getAlbum>>[number]
}) {
	return (
		<Link
			href={`/album/${album.slug}`}
			className="hover:scale-105 transition-transform"
		>
			<div className="card w-96 border-primary rounded-none">
				<figure className="bg-white py-4">
					<Image
						src={album.imageUrl}
						alt={album.name}
						width={340}
						height={340}
					/>
				</figure>
				<div className="card-body py-3 bg-primary text-base-100 h-28">
					<h2 className="card-title">{album.name}</h2>
					<p>{album.releaseYear}</p>
				</div>
			</div>
		</Link>
	)
}

export function AlbumListSkeleton() {
	return <div></div>
}

export async function AlbumList({
	searchParams,
}: {
	searchParams: { q: string }
}) {
	const albums = await getAlbum(searchParams?.q)
	if (!albums.length)
		return (
			<div className="flex flex-col gap-8 bg-white border-t-8 border-primary shadow rounded p-4 text-primary w-fit font-bold text-2xl self-center">
				No results found!
			</div>
		)
	return (
		<div className="flex flex-wrap gap-12 justify-center">
			{albums.map((album) => (
				<AlbumItem album={album} key={album.id} />
			))}
		</div>
	)
}
