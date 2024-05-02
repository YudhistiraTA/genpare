import { getSongBySlug } from '@/app/lib/api/song'
import { languageCode } from '@/app/lib/languageCode'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const AlbumComponent = memo(
	({
		song,
		className,
	}: {
		song: Awaited<ReturnType<typeof getSongBySlug>>
		slug: string
		className?: string
	}) => {
		return (
			<div
				className={clsx(
					'card rounded lg:shadow-xl lg:max-w-[375px] bg-white text-secondary border-t-8 border-primary',
					className,
				)}
			>
				<figure className="mt-4">
					<Link href={`/album/${song.Album.slug}`}>
						<Image
							src={song.Album.imageUrl}
							alt={song.Album.name}
							width={200}
							height={200}
							className="hover:scale-105 transition-transform rounded-xl py-2"
						/>
					</Link>
				</figure>
				<div className="card-body -mt-4">
					<Link href={`/album/${song.Album.slug}`}>
						<h2 className="card-title">
							{song.Album.name} ({song.Album.releaseYear})
						</h2>
					</Link>
					{song.Album.Circle ? (
						<div className="flex w-fit">
							<p>Circle</p>
							<p className="whitespace-pre">: </p>
							<div className="flex flex-wrap">
								<div className="flex">
									<Link
										href={`/circle/${song.Album.Circle.slug}`}
										className="bg-slate-200 bg-opacity-30 hover:bg-primary hover:text-base-100 transition-colors rounded-2xl px-2"
									>
										{song.Album.Circle.name}
									</Link>
								</div>
							</div>
						</div>
					) : null}
					<div className="flex w-fit">
						<p>Total Tracks</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							<div className="flex">
								<p className="bg-slate-200 bg-opacity-30 hover:bg-primary hover:text-base-100 transition-colors rounded-2xl px-2">
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
										className="flex flex-col self-start w-full hover:bg-primary hover:text-base-100"
									>
										<p className="self-start">
											{item.trackNo}
											{'. '}
											{item.name}
										</p>
										<p className="pl-6 -mt-1 opacity-70 self-start">
											{item.Lyrics.filter(
												(lyric) => lyric.language !== 'romaji',
											)
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
	},
)
AlbumComponent.displayName = 'AlbumDetail'
export const AlbumDetail = memo(AlbumComponent)
