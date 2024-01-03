import { FormWrapper } from '@/app/ui/cms/album/new/formWrapper'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default function page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<FormWrapper />
			</Suspense>
		</div>
	)
}
