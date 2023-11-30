import { getSongBySlug } from '@/app/lib/api/song'
import { languageCode } from '@/app/lib/languageCode'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumDetail({
	song,
	slug,
	className,
}: {
	song: Awaited<ReturnType<typeof getSongBySlug>>
	slug: string
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
				<h2 className="card-title">
					{song.Album.name} ({song.Album.releaseYear})
				</h2>
				<div className="flex w-fit">
					<p>Circle</p>
					<p className="whitespace-pre">: </p>
					<div className="flex flex-wrap">
						<div className="flex">
							<Link
								href={`/circle/${song.Album.Circle.slug}`}
								className="bg-slate-200 hover:bg-secondary transition-colors hover:bg-opacity-30 rounded-2xl px-2"
							>
								{song.Album.Circle.name}
							</Link>
						</div>
					</div>
				</div>
				<div className="flex w-fit">
					<p>Total Tracks</p>
					<p className="whitespace-pre">: </p>
					<div className="flex flex-wrap">
						<div className="flex">
							<p className="bg-slate-200 hover:bg-secondary transition-colors hover:bg-opacity-30 rounded-2xl px-2">
								{song.Album.totalTrack}
							</p>
						</div>
					</div>
				</div>
			</div>
			<ul className="menu -mt-10">
				<li>
					<h2 className="menu-title">Songs</h2>
					<ul>
						{song.Album.Song.map((item) => (
							<li key={`list_${item.id}`}>
								<Link
									href={`/song/${item.slug}`}
									className={clsx(
										'flex flex-col self-start w-full',
										slug === item.slug &&
											'bg-primary bg-opacity-20 hover:bg-primary hover:bg-opacity-20',
									)}
								>
									<p className="self-start">
										{item.trackNo}
										{'. '}
										{item.name}
									</p>
									<p className="pl-6 -mt-1 text-slate-400 self-start">
										{item.Lyrics.filter((lyric) => lyric.language !== 'romaji')
											.map((lyric) => languageCode.get(lyric.language))
											.join(', ')}
									</p>
								</Link>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</div>
	)
}
