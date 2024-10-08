import { fetchActors } from '@/app/lib/api/cms/lyrics/fetchActors'
import { fetchLyrics } from '@/app/lib/api/cms/lyrics/fetchLyrics'
import { LyricsTabs } from '@/app/ui/cms/song/lyrics/lyricsTabs'

export async function LyricsTabsWrapper({ slug }: { slug: string }) {
	const data = await fetchLyrics(slug)
	const actors = await fetchActors()
	return <LyricsTabs data={data} actors={actors}/>
}
