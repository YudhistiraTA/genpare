import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'
import { Form } from '@/app/ui/cms/actor/edit/form'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default async function page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const data = await fetchActor(slug)
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<Form data={data} />
			</Suspense>
		</div>
	)
}
