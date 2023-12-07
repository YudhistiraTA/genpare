import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import { AlbumDetail } from '@/app/ui/song/albumDetail'
import { LanguageSelect } from '@/app/ui/song/languageSelect'
import { Lyrics } from '@/app/ui/song/lyrics'
import { SongDetail } from '@/app/ui/song/songDetail'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{
		params: { slug },
	}: {
		params: { slug: string }
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const song = await getSongBySlug(slug)
	const composer = song.Composer.map((composer) => composer.name)
	const vocalists = song.Vocals.map((vocal) => vocal.name)
	const lyricists = song.Lyrics.filter(
		(lyric) => lyric.language === 'japanese',
	).map((lyric) => lyric.createdBy.name)
	const translations = song.Lyrics.filter(
		(lyric) => lyric.language !== 'romaji' && lyric.language !== 'japanese',
	).map((lyric) => capitalize(lyric.language))
	const translators = song.Lyrics.filter(
		(lyric) => lyric.language !== 'japanese' && lyric.language !== 'romaji',
	).map((lyric) => lyric.createdBy.name)
	const prevMeta = await parent
	return {
		title: song.name,
		description: `Lyrics and translations for ${song.name} from the album ${song.Album.name}`,
		keywords: [
			'Genpare',
			'Translation',
			'Gengo Parade',
			'Doujin',
			'Song',
			song.name,
			song.Album.Circle.name,
			song.Album.releaseYear.toString(),
			...composer,
			...vocalists,
			...lyricists,
			...translations,
			...translators,
		],
		alternates: {
			canonical: `https://www.gengo-parade.com/song/${song.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: song.name,
				description: `Lyrics and translations for ${song.name} from the album ${song.Album.name}`,
				images: [
					{
						url: song.Album.imageUrl,
						alt: song.name,
					},
				],
			},
		}),
	}
}

export default async function Page({
	params: { slug },
	searchParams: { main, sub },
}: {
	params: { slug: string }
	searchParams: { main: string; sub: string }
}) {
	const song = await getSongBySlug(slug)
	const languages = song.Lyrics.map((lyric) => capitalize(lyric.language))
	return (
		<section className="grid lg:flex lg:justify-center gap-6 grid-cols-1 relative">
			<section id="mobile-detail" className="lg:hidden">
				<div className="lg:hidden glass collapse shadow collapse-arrow mb-4">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">Song Detail</div>
					<div className="collapse-content">
						<SongDetail song={song} main={main} sub={sub} options={languages} />
					</div>
				</div>
				<div className="lg:hidden glass collapse shadow collapse-arrow">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">Album Detail</div>
					<div className="collapse-content">
						<AlbumDetail slug={slug} song={song} />
					</div>
				</div>
			</section>
			<article className="flex flex-col text-left gap-2 card shadow glass rounded-3xl lg:mt-0 mt-4">
				<div className="card-body whitespace-pre-wrap">
					<LanguageSelect
						className="mb-6"
						options={languages}
						main={main}
						sub={sub}
					/>
					<Lyrics
						main={
							song.Lyrics.find(
								(lyric) =>
									lyric.language === (main?.toLowerCase() ?? 'japanese'),
							)?.content
						}
						sub={
							song.Lyrics.find(
								(lyric) =>
									lyric.language ===
									(sub?.toLowerCase() ??
										(languages.includes('English') ? 'english' : 'romaji')),
							)?.content
						}
					/>
				</div>
			</article>
			<div id="desktop-detail" className="lg:flex lg:flex-col hidden gap-4">
				<AlbumDetail slug={slug} song={song} />
				<div className="sticky top-6">
					<SongDetail song={song} main={main} sub={sub} options={languages} />
				</div>
			</div>
		</section>
	)
}
