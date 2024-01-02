import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { Form } from '@/app/ui/cms/album/edit/form'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const data = await fetchAlbum(slug)
	const circles = await fetchCircles()
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<Form data={data} circles={circles} />
			</Suspense>
		</div>
	)
}
