import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import { LanguageSelect } from '@/app/ui/main/song/languageSelect'
import YouTubePlayer from '@/app/ui/main/youtube'
import clsx from 'clsx'
import Link from 'next/link'
import { memo } from 'react'

const SongComponent = memo(
	({
		song,
		className,
		main,
		sub,
		options,
	}: {
		song: Awaited<ReturnType<typeof getSongBySlug>>
		className?: string
		main: string
		sub: string
		options: string[]
	}) => {
		return (
			<div
				className={clsx(
					'card rounded lg:shadow-xl shadow-none lg:max-w-[375px] bg-white text-secondary border-t-8 border-primary',
					className,
				)}
			>
				<YouTubePlayer videoId={song.youtubeId} title={song.name} />
				<div className="card-body -mt-4">
					<h2 className="card-title">{song.name}</h2>
					{song.Vocals.length > 0 ? (
						<div className="flex w-fit">
							<p>Vocalist{song.Vocals.length > 1 && 's'}</p>
							<p className="whitespace-pre">: </p>
							<div className="flex flex-wrap">
								{song.Vocals.map((vocal, index) => (
									<div key={vocal.id} className="flex">
										<Link
											href={`/artist/${vocal.slug}`}
											className="bg-slate-200 bg-opacity-30 hover:bg-primary transition-colors hover:text-base-100 rounded-2xl px-2"
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
					) : null}
					{song.Composer.length > 0 ? (
						<div className="flex w-fit">
							<p>Composer{song.Composer.length > 1 && 's'}</p>
							<p className="whitespace-pre">: </p>
							<div className="flex flex-wrap">
								{song.Composer.map((composer, index) => (
									<div key={composer.id} className="flex">
										<Link
											href={`/artist/${composer.slug}`}
											className="bg-slate-200 bg-opacity-30 hover:bg-primary transition-colors hover:text-base-100 rounded-2xl px-2"
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
					) : null}
					{song.Lyrics.filter((lyric) => lyric.language !== 'romaji').map(
						(lyric) =>
							lyric.createdBy ? (
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
												className="bg-slate-200 bg-opacity-30 hover:bg-primary transition-colors hover:text-base-100 rounded-2xl px-2"
											>
												{lyric.createdBy.name}
											</Link>
										</div>
									</div>
								</div>
							) : null,
					)}
					<LanguageSelect
						className="mb-6 lg:flex hidden"
						options={options}
						main={main}
						sub={sub}
					/>
				</div>
			</div>
		)
	},
)

SongComponent.displayName = 'SongDetail'
export const SongDetail = memo(SongComponent)
