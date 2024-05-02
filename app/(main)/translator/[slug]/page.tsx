import { getTranslator } from '@/app/lib/api/actors'
import { SongListProvided, SongListSkeleton } from '@/app/ui/main/song/songList'
import Subheader from '@/app/ui/main/subheader'
import { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [translator] = await getTranslator(slug)
	const prevMeta = await parent
	return {
		title: translator.name,
		description: `Discography involving ${translator.name} as translator`,
		keywords: [...(prevMeta.keywords ?? []), 'Translator', translator.name],
		alternates: {
			canonical: `https://www.gengo-parade.com/translator/${translator.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: translator.name,
				description: `Discography involving ${translator.name} as translator`,
			},
		}),
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [translator, albums] = await getTranslator(slug)
	return (
		<div>
			<Subheader title="Translator" subtitle={translator.name} disableSearchbar />
			<div className="lg:px-60 py-8 flex justify-center">
				<Suspense fallback={<SongListSkeleton />}>
					<SongListProvided albums={albums} />
				</Suspense>
			</div>
		</div>
	)
}
