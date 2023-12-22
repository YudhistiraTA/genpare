import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'
import { Form } from '@/app/ui/cms/actor/edit/form'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'

export default async function page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const data = await fetchActor(slug)
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Form data={data} />
		</div>
	)
}
