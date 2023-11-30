import { getSongBySlug } from '@/app/lib/api/song'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumDetail({
	song,
	className,
}: {
	song: Awaited<ReturnType<typeof getSongBySlug>>
	className?: string
}) {
	return (
		<div
			className={clsx(
				'card lg:fixed lg:top-28 md:w-72 lg:right-28 lg:w-96 lg:shadow-xl',
				className,
			)}
		>
			<figure className="mt-4">
				<Image
					src={song.Album.imageUrl}
					alt={song.Album.name}
					width={200}
					height={200}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{song.Album.name}</h2>				
			</div>
		</div>
	)
}
