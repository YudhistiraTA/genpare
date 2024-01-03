import { fetchFormOptions } from '@/app/lib/api/cms/song/formOptions'
import { Form } from '@/app/ui/cms/song/new/form'

export async function FormWrapper() {
	const options = await fetchFormOptions()
	return <Form options={options} />
}
