import { SongList, SongListSkeleton } from '@/app/ui/main/song/songList'
import Subheader from '@/app/ui/main/subheader'
import { Suspense } from 'react'

export default function Page({
	searchParams,
}: {
	searchParams: { q: string }
}) {
	return (
		<div>
			<Subheader title="Translations" />
			<div className="lg:px-60 py-8 flex justify-center">
				<Suspense fallback={<SongListSkeleton />}>
					<SongList searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	)
}
