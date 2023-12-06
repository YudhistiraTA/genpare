import { getAlbumBySlug } from '@/app/lib/api/album'
import { capitalize } from '@/app/lib/capitalize'
import { joinWithAnd } from '@/app/lib/joinWithAnd'
import { languageCode } from '@/app/lib/languageCode'
import { Actor } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const album = await getAlbumBySlug(slug)
	const prevMeta = await parent
	const composers = album.Song.flatMap((song) =>
		song.Composer.map((composer) => composer.name),
	)
	const vocalists = album.Song.flatMap((song) =>
		song.Vocals.map((vocal) => vocal.name),
	)
	const lyricists = album.Song.flatMap((song) =>
		song.Lyrics.filter((lyric) => lyric.language === 'japanese').map(
			(lyric) => lyric.createdBy.name,
		),
	)
	const translations = album.Song.flatMap((song) =>
		song.Lyrics.filter(
			(lyric) => lyric.language !== 'romaji' && lyric.language !== 'japanese',
		).map((lyric) => capitalize(lyric.language)),
	)
	const translators = album.Song.flatMap((song) =>
		song.Lyrics.filter(
			(lyric) => lyric.language !== 'japanese' && lyric.language !== 'romaji',
		).map((lyric) => lyric.createdBy.name),
	)
	return {
		title: album.name,
		description: `${album.name} album by the circle ${
			album.Circle.name
		} released on ${album.releaseYear} composed by ${joinWithAnd(
			composers,
		)}with ${joinWithAnd(vocalists)} as vocalists and ${joinWithAnd(
			lyricists,
		)} as lyricists translated into ${joinWithAnd(
			translations,
		)} by ${joinWithAnd(translators)}`,
		keywords: [
			...(prevMeta.keywords ?? []),
			'Album',
			album.name,
			album.Circle.name,
			album.releaseYear.toString(),
			...composers,
			...vocalists,
			...lyricists,
			...translations,
			...translators,
			...album.Song.flatMap((song) => song.name),
		],
		alternates: {
			canonical: `https://www.gengo-parade.com/album/${album.slug}`,
		},
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const album = await getAlbumBySlug(slug)

	const uniqueComposers: Set<Actor> = new Set()
	album.Song.forEach((song) =>
		song.Composer.forEach((composer) => uniqueComposers.add(composer)),
	)
	const uniqueComposersArray = Array.from(uniqueComposers)

	const uniqueVocalists: Set<Actor> = new Set()
	album.Song.forEach((song) =>
		song.Vocals.forEach((vocal) => uniqueVocalists.add(vocal)),
	)
	const uniqueVocalistsArray = Array.from(uniqueVocalists)

	const uniqueLyricists: Set<Actor> = new Set()
	album.Song.forEach((song) =>
		song.Lyrics.filter((lyric) => lyric.language === 'japanese').forEach(
			(lyric) => {
				uniqueLyricists.add(lyric.createdBy)
			},
		),
	)
	const uniqueLyricistsArray = Array.from(uniqueLyricists)

	return (
		<div className="hero">
			<div className="hero-content flex-col lg:flex-row gap-10">
				<Image
					src={album.imageUrl}
					alt={album.name}
					width={320}
					height={320}
					className="max-w-sm rounded-2xl shadow-2xl"
				/>
				<div className="flex flex-col glass bg-white bg-opacity-60 gap-2 border shadow-lg px-6 pt-4 rounded-2xl">
					<h1 className="text-3xl font-bold tracking-tight">{album.name}</h1>
					<div className="flex w-fit mt-4">
						<p>Release Year</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							<div className="flex">
								<p className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2">
									{album.releaseYear}
								</p>
							</div>
						</div>
					</div>
					<div className="flex w-fit">
						<p>Circle</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							<div className="flex">
								<Link
									href={`/circle/${album.Circle.slug}`}
									className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
								>
									{album.Circle.name}
								</Link>
							</div>
						</div>
					</div>
					<div className="flex w-fit">
						<p>Composer{uniqueComposersArray.length > 1 && 's'}</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							{uniqueComposersArray.map((composer, index) => (
								<div key={composer.id} className="flex">
									<Link
										href={`/artist/${composer.slug}`}
										className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
									>
										{composer.name}
									</Link>
									{index < uniqueComposersArray.length - 1 && (
										<p className="whitespace-pre">,</p>
									)}
								</div>
							))}
						</div>
					</div>
					<div className="flex w-fit">
						<p>Lyricist{uniqueLyricistsArray.length > 1 && 's'}</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							{uniqueLyricistsArray.map((lyricist, index) => (
								<div key={lyricist.id} className="flex">
									<Link
										href={`/artist/${lyricist.slug}`}
										className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
									>
										{lyricist.name}
									</Link>
									{index < uniqueLyricistsArray.length - 1 && (
										<p className="whitespace-pre">,</p>
									)}
								</div>
							))}
						</div>
					</div>
					<div className="flex w-fit">
						<p>Vocalist{uniqueVocalistsArray.length > 1 && 's'}</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							{uniqueVocalistsArray.map((vocal, index) => (
								<div key={vocal.id} className="flex">
									<Link
										href={`/artist/${vocal.slug}`}
										className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2"
									>
										{vocal.name}
									</Link>
									{index < uniqueVocalistsArray.length - 1 && (
										<p className="whitespace-pre">,</p>
									)}
								</div>
							))}
						</div>
					</div>
					<div className="flex w-fit">
						<p>Total Tracks</p>
						<p className="whitespace-pre">: </p>
						<div className="flex flex-wrap">
							<div className="flex">
								<p className="bg-slate-200 bg-opacity-30 hover:bg-accent transition-colors hover:bg-opacity-60 rounded-2xl px-2">
									{album.totalTrack}
								</p>
							</div>
						</div>
					</div>
					<ul className="menu -ml-6 -mt-2">
						<li>
							<h2 className="menu-title">Songs</h2>
							<ul>
								{album.Song.map((item) => (
									<li key={`list_${item.id}`}>
										<Link
											href={`/song/${item.slug}`}
											className="flex flex-col self-start w-full hover:bg-primary hover:bg-opacity-20"
										>
											<p className="self-start">
												{item.trackNo}
												{'. '}
												{item.name}
											</p>
											<p className="pl-6 text-sm -mt-2	 text-slate-400 self-start">
												Vocalist{item.Vocals.length > 1 && 's'}:{' '}
												{item.Vocals.map((vocal) => vocal.name).join(', ')}
											</p>
											<p className="pl-6 text-sm -mt-2	 text-slate-400 self-start">
												Composer{item.Vocals.length > 1 && 's'}:{' '}
												{item.Composer.map((composer) => composer.name).join(
													', ',
												)}
											</p>
											<p className="pl-6 text-sm -mt-2	 text-slate-400 self-start">
												Lyricist:{' '}
												{
													item.Lyrics.find(
														(lyric) => lyric.language === 'japanese',
													)?.createdBy.name
												}
											</p>
											<p className="pl-6 text-sm -mt-2	 text-slate-400 self-start">
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
			</div>
		</div>
	)
}
