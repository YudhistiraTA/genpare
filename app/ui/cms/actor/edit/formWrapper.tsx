import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'
import { Form } from '@/app/ui/cms/actor/edit/form'

export async function FormWrapper({ slug }: { slug: string }) {
	const data = await fetchActor(slug)
	return <Form data={data} />
}
