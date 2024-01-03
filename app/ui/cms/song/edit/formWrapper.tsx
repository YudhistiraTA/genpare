import { fetchSong } from '@/app/lib/api/cms/song/fetchSong'
import { fetchFormOptions } from '@/app/lib/api/cms/song/formOptions'
import { Form } from '@/app/ui/cms/song/edit/form'

export async function FormWrapper({slug}:{slug:string}) {
	const options = await fetchFormOptions()
  const data = await fetchSong(slug)
	return <Form options={options} data={data}/>
}
