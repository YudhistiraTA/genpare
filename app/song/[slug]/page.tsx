import { getSongBySlug } from '@/app/lib/api/song'
import { capitalize } from '@/app/lib/capitalize'
import { LanguageSelect } from '@/app/ui/languageSelect'
import { Lyrics } from '@/app/ui/lyrics'
import YouTubePlayer from '@/app/ui/youtube'

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
			<div className="card lg:fixed lg:top-28 lg:left-40 w-96 lg:shadow-xl">
				<figure className="mt-4">
					<YouTubePlayer width="320" height="185" videoId={song.youtubeId} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{song.name}</h2>
				</div>
			</div>
			<div> </div>
			<article className="flex flex-col text-left gap-2 card shadow-xl">
				<div className="card-body">
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
			<div className="flex flex-col items-center">hi</div>
		</section>
	)
}
