import { getCircle } from '@/app/lib/api/actors'
import { SongListProvided, SongListSkeleton } from '@/app/ui/main/song/songList'
import Subheader from '@/app/ui/main/subheader'
import { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [circle] = await getCircle(slug)
	const prevMeta = await parent
	return {
		title: circle.name,
		description: `Discography with ${circle.name} as circle`,
		keywords: [...(prevMeta.keywords ?? []), 'Circle', circle.name],
		alternates: {
			canonical: `https://www.gengo-parade.com/circle/${circle.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: circle.name,
				description: `Discography with ${circle.name} as circle`,
			},
		}),
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [circle, albums] = await getCircle(slug)
	return (
		<div>
			<Subheader title="Circle" subtitle={circle.name} disableSearchbar />
			<div className="lg:px-60 py-8 flex justify-center">
				<Suspense fallback={<SongListSkeleton />}>
					<SongListProvided albums={albums} />
				</Suspense>
			</div>
		</div>
	)
}
