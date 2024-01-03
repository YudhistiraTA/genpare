import { FormWrapper } from '@/app/ui/cms/album/edit/formWrapper'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Suspense } from 'react'

export default function Page({
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
