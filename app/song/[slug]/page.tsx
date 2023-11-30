import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import { AlbumDetail } from '@/app/ui/song/albumDetail'
import { LanguageSelect } from '@/app/ui/song/languageSelect'
import { Lyrics } from '@/app/ui/song/lyrics'
import { SongDetail } from '@/app/ui/song/songDetail'

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
			<div className="lg:hidden collapse shadow collapse-arrow mb-4">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Song Detail</div>
				<div className="collapse-content">
					<SongDetail song={song} />
				</div>
			</div>
			<div className="lg:hidden collapse shadow collapse-arrow">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Album Detail</div>
				<div className="collapse-content">
					<AlbumDetail slug={slug} song={song} />
				</div>
			</div>
			<SongDetail song={song} className="lg:block hidden" />
			<AlbumDetail slug={slug} song={song} className="lg:block hidden" />
			<div></div>
			<article className="flex flex-col text-left gap-2 card shadow-xl">
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
