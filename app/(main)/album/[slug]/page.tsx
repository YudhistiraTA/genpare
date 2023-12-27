import { getAlbumBySlug } from '@/app/lib/api/album'
import { capitalize } from '@/app/lib/capitalize'
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
			(lyric) => lyric.createdBy?.name,
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
		).map((lyric) => lyric.createdBy?.name),
	)
	return {
		title: album.name,
		description: `${album.name} (${album.releaseYear}) album by ${album.Circle?.name}`,
		keywords: [
			...(prevMeta.keywords ?? []),
			'Album',
			album.name,
			album.Circle?.name ?? '',
			album.releaseYear.toString(),
			...composers,
			...vocalists,
			...(lyricists.length > 0 ? (lyricists as string[]) : []),
			...translations,
			...(translators.length > 0 ? (translators as string[]) : []),
			...album.Song.flatMap((song) => song.name),
		],
		alternates: {
			canonical: `https://www.gengo-parade.com/album/${album.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: album.name,
				description: `${album.name} (${album.releaseYear}) album ${
					album.Circle?.name ? 'by ' + album.Circle?.name : ''
				}`,
				images: [
					{
						url: album.imageUrl,
						alt: album.name,
					},
				],
			},
		}),
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const album = await getAlbumBySlug(slug)

	const uniqueComposersMap: Map<string, Actor> = new Map()
	album.Song.forEach((song) =>
		song.Composer.forEach((composer) => {
			const key = JSON.stringify(composer)
			if (!uniqueComposersMap.has(key)) {
				uniqueComposersMap.set(key, composer)
			}
		}),
	)
	const uniqueComposersArray = Array.from(uniqueComposersMap.values())

	const uniqueVocalistsMap: Map<string, Actor> = new Map()
	album.Song.forEach((song) =>
		song.Vocals.forEach((vocal) => {
			const key = JSON.stringify(vocal)
			if (!uniqueVocalistsMap.has(key)) {
				uniqueVocalistsMap.set(key, vocal)
			}
		}),
	)
	const uniqueVocalistsArray = Array.from(uniqueVocalistsMap.values())

	const uniqueLyricistsMap: Map<string, Actor> = new Map()
	album.Song.forEach((song) =>
		song.Lyrics.filter((lyric) => lyric.language === 'japanese').forEach(
			(lyric) => {
				const key = JSON.stringify(lyric.createdBy)
				if (!uniqueLyricistsMap.has(key) && lyric.createdBy) {
					uniqueLyricistsMap.set(key, lyric.createdBy)
				}
			},
		),
	)
	const uniqueLyricistsArray = Array.from(uniqueLyricistsMap.values())

	return (
		<div className="hero">
			<div className="hero-content flex-col lg:flex-row gap-10">
				<Image
					src={album.imageUrl}
					alt={album.name}
					width={320}
					height={320}
					className="rounded-2xl shadow-2xl w-80 h-80"
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
					{album.Circle ? (
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
					) : null}
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
											<p className="pl-6 text-sm -mt-2 text-slate-400 self-start whitespace-pre flex">
												Vocalist{item.Vocals.length > 1 && 's'}:{' '}
												<span className="flex flex-wrap">
													{item.Vocals.map((vocal, index, arr) => (
														<span key={`${vocal.id}-${index}`}>
															{vocal.name}
															{index !== arr.length - 1 && ', '}
														</span>
													))}
												</span>
											</p>
											{item.Composer.length ? (
												<p className="pl-6 text-sm -mt-2 text-slate-400 self-start whitespace-pre flex">
													Composer{item.Composer.length > 1 && 's'}:{' '}
													<span className="flex flex-wrap">
														{item.Composer.map((composer, index, arr) => (
															<span key={`${composer.id}-${index}`}>
																{composer.name}
																{index !== arr.length - 1 && ', '}
															</span>
														))}
													</span>
												</p>
											) : null}
											<p className="pl-6 text-sm -mt-2 text-slate-400 self-start whitespace-pre flex">
												Lyricist:{' '}
												<span className="flex flex-wrap">
													{item.Lyrics.filter(
														(lyric) => lyric.language === 'japanese',
													).map((lyric, index, arr) =>
														lyric.createdBy ? (
															<span key={`${lyric.id}-${index}`}>
																{lyric.createdBy.name}
																{index !== arr.length - 1 && ', '}
															</span>
														) : null,
													)}
												</span>
											</p>
											<p className="pl-6 text-sm -mt-2 text-slate-400 self-start">
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
