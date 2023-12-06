import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import { AlbumDetail } from '@/app/ui/song/albumDetail'
import { LanguageSelect } from '@/app/ui/song/languageSelect'
import { Lyrics } from '@/app/ui/song/lyrics'
import { SongDetail } from '@/app/ui/song/songDetail'
import { Metadata } from 'next'

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string }
}): Promise<Metadata> {
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
		<section className="grid lg:grid-cols-3 grid-cols-1">
			<div className="lg:hidden glass collapse shadow collapse-arrow mb-4">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Song Detail</div>
				<div className="collapse-content">
					<SongDetail song={song} />
				</div>
			</div>
			<div className="lg:hidden glass collapse shadow collapse-arrow">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Album Detail</div>
				<div className="collapse-content">
					<AlbumDetail slug={slug} song={song} />
				</div>
			</div>
			<SongDetail song={song} className="lg:block hidden" />
			<AlbumDetail slug={slug} song={song} className="lg:block hidden" />
			<div></div>
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
			<div> </div>
		</section>
	)
}
