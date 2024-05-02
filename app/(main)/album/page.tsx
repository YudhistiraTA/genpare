import { AlbumList, AlbumListSkeleton } from '@/app/ui/main/album/albumList'
import Subheader from '@/app/ui/main/subheader'
import { Suspense } from 'react'

export default function Page({
	searchParams,
}: {
	searchParams: { q: string }
}) {
	return (
		<div>
			<Subheader title="Albums" />
			<div className="lg:px-60 py-8 flex justify-center">
				<Suspense fallback={<AlbumListSkeleton />}>
					<AlbumList searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	)
}
