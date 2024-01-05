import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { Form } from '@/app/ui/cms/album/edit/form'

export async function FormWrapper({ slug }: { slug: string }) {
	const data = await fetchAlbum(slug)
	const circles = await fetchCircles()
	return <Form data={data} circles={circles} />
}
