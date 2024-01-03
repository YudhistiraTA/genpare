import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { FormWrapper } from '@/app/ui/cms/song/new/formWrapper'
import { Suspense } from 'react'

export default function page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<p>Loading form...</p>}>
				<FormWrapper />
			</Suspense>
		</div>
	)
}
