import { FormWrapper } from '@/app/ui/cms/actor/edit/formWrapper'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default function page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<Suspense fallback={<div>Loading form...</div>}>
				<FormWrapper slug={slug} />
			</Suspense>
		</div>
	)
}
