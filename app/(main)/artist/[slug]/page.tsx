import { getArtist } from '@/app/lib/api/actors'
import { SongListProvided, SongListSkeleton } from '@/app/ui/main/song/songList'
import Subheader from '@/app/ui/main/subheader'
import { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [artist] = await getArtist(slug)
	const prevMeta = await parent
	return {
		title: artist.name,
		description: `Discography involving ${artist.name}`,
		keywords: [...(prevMeta.keywords ?? []), 'Artist', artist.name],
		alternates: {
			canonical: `https://www.gengo-parade.com/artist/${artist.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: artist.name,
				description: `Discography involving ${artist.name}`,
			},
		}),
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [artist, albums] = await getArtist(slug)
	return (
		<div>
			<Subheader title="Artist" subtitle={artist.name} disableSearchbar />
			<div className="lg:px-60 py-8 flex justify-center">
				<Suspense fallback={<SongListSkeleton />}>
					<SongListProvided albums={albums} />
				</Suspense>
			</div>
		</div>
	)
}
