import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { LyricsTabsWrapper } from '@/app/ui/cms/song/lyrics/lyricsTabsWrapper'
import { Suspense } from 'react'

export default function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<LyricsTabsWrapper slug={slug} />
			</Suspense>
		</div>
	)
}
