import { fetchAlbumList } from '@/app/lib/api/cms/song/fetchAlbumList'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Form } from '@/app/ui/cms/song/new/form'
import { Suspense } from 'react'

export default async function page() {
	const albums = await fetchAlbumList()
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<p>Loading form...</p>}>
				<Form albums={albums}/>
			</Suspense>
		</div>
	)
}
