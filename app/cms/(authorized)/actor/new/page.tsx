import { Form } from '@/app/ui/cms/actor/new/form'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'

export default function page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Form />
		</div>
	)
}
