import { getSongsGroupedByAlbum } from '@/app/lib/api/song'
import { languageCode } from '@/app/lib/languageCode'
import Link from 'next/link'

export function SongListSkeleton() {
	return <div></div>
}

function SongListItem({
	albums,
}: {
	albums: Awaited<ReturnType<typeof getSongsGroupedByAlbum>>
}) {
	return (
		<div className="flex flex-col gap-8 bg-white border-t-8 border-primary shadow rounded p-4 text-primary w-fit">
			{albums.map((album) => (
				<div key={album.id}>
					<Link
						href={`/album/${album.slug}`}
						className="flex font-bold text-lg w-fit mb-3"
					>
						<p className="text-neutral">{album.Circle?.name}</p>
						<p className="mx-1">-</p>
						<p className="truncate w-52 lg:w-auto">{album.name}</p>
					</Link>
					<ul>
						{album.Song.map((song) => (
							<li key={song.id} className="flex">
								<hr className="w-20 self-center bg-primary h-0.5 mr-2" />
								<Link
									href={`/song/${song.slug}`}
									className="flex gap-2 items-end"
								>
									<p className="font-bold truncate w-60 lg:w-auto">
										{song.name}
									</p>
									<p className="text-neutral text-sm lg:block hidden">
										{'['}
										{song.Lyrics.filter(
											(lyrics) =>
												lyrics.language !== 'japanese' &&
												lyrics.language !== 'romaji',
										)
											.map((lyrics) => languageCode.get(lyrics.language))
											.join(', ')}
										{']'}
									</p>
									<p className="text-neutral text-sm lg:block hidden">
										作曲:{' '}
										{song.Composer.map((composer) => composer.name).join(', ')}
									</p>
									{song.Lyrics.find((lyric) => lyric.language === 'japanese')
										?.createdBy?.name && (
										<p className="text-neutral text-sm lg:block hidden">
											作詞:{' '}
											{
												song.Lyrics.find(
													(lyric) => lyric.language === 'japanese',
												)?.createdBy?.name
											}
										</p>
									)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export function SongListProvided({
	albums,
}: {
	albums: Awaited<ReturnType<typeof getSongsGroupedByAlbum>>
}) {
	if (!albums.length)
		return (
			<div className="flex flex-col gap-8 bg-white border-t-8 border-primary shadow rounded p-4 text-primary w-fit font-bold text-2xl">
				No results found!
			</div>
		)
	return <SongListItem albums={albums} />
}

export async function SongList({
	searchParams,
}: {
	searchParams: { q: string }
}) {
	const albums = await getSongsGroupedByAlbum(searchParams?.q)
	if (!albums.length)
		return (
			<div className="flex flex-col gap-8 bg-white border-t-8 border-primary shadow rounded p-4 text-primary w-fit font-bold text-2xl">
				No results found!
			</div>
		)
	return <SongListItem albums={albums} />
}
