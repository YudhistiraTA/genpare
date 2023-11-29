import { getSongBySlug } from '@/app/lib/api/song'
import YouTubePlayer from '@/app/ui/youtube'

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const song = await getSongBySlug(slug)
	return (
		<section>
			<p>
				{song.name}
				{song.youtubeId}
			</p>
			<YouTubePlayer videoId={song.youtubeId} />
			<article className="flex flex-row gap-6">
				{song.Lyrics.map((lyric) => (
					<p key={lyric.id} className="whitespace-pre w-fit">
						{lyric.content.replace(/\\n/g, '\n')}
					</p>
				))}
			</article>
		</section>
	)
}
