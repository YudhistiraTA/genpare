import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Form } from '@/app/ui/cms/song/new/form'

export default function page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Form />
		</div>
	)
}
