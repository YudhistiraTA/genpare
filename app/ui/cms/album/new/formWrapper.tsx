import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { Form } from '@/app/ui/cms/album/new/form'

export async function FormWrapper() {
	const circles = await fetchCircles()
	return <Form circles={circles} />
}
