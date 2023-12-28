import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { Form } from '@/app/ui/cms/album/new/form'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default async function page() {
	const circles = await fetchCircles()
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<Form	circles={circles} />
			</Suspense>
		</div>
	)
}
