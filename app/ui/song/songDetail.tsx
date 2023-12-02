import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import YouTubePlayer from '@/app/ui/youtube'
import clsx from 'clsx'
import Link from 'next/link'

export function SongDetail({
	song,
	className,
}: {
	song: Awaited<ReturnType<typeof getSongBySlug>>
	className?: string
}) {
	return (
		<div
			className={clsx(
				'card glass lg:fixed lg:top-28 md:w-72 lg:left-28 lg:w-96 lg:shadow-xl',
				className,
			)}
		>
			<figure className="mt-4">
				<YouTubePlayer width="320" height="185" videoId={song.youtubeId} />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{song.name}</h2>
				<div className="flex w-fit">
					<p>Vocalist{song.Vocals.length > 1 && 's'}</p>
					<p className="whitespace-pre">: </p>
					<div className="flex flex-wrap">
						{song.Vocals.map((vocal, index) => (
							<div key={vocal.id} className="flex">
								<Link
									href={`/artist/${vocal.slug}`}
									className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
								>
									{vocal.name}
								</Link>
								{index < song.Vocals.length - 1 && (
									<p className="whitespace-pre">,</p>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="flex w-fit">
					<p>Composer{song.Vocals.length > 1 && 's'}</p>
					<p className="whitespace-pre">: </p>
					<div className="flex flex-wrap">
						{song.Composer.map((composer, index) => (
							<div key={composer.id} className="flex">
								<Link
									href={`/artist/${composer.slug}`}
									className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
								>
									{composer.name}
								</Link>
								{index < song.Composer.length - 1 && (
									<p className="whitespace-pre">,</p>
								)}
							</div>
						))}
					</div>
				</div>
				{song.Lyrics.filter((lyric) => lyric.language !== 'romaji').map(
					(lyric) => (
						<div key={lyric.id} className="flex w-fit">
							<p>
								{lyric.createdBy.role === 'translator'
									? `${capitalize(lyric.language)} translator`
									: 'Lyricist'}
							</p>
							<p className="whitespace-pre">: </p>
							<div className="flex flex-wrap">
								<div className="flex">
									<Link
										href={`/${
											lyric.createdBy.role === 'lyricist'
												? 'artist'
												: lyric.createdBy.role
										}/${lyric.createdBy.slug}`}
										className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
									>
										{lyric.createdBy.name}
									</Link>
								</div>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	)
}
