import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Song',
}

export default function Page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<p className="text-2xl -mt-2">Song</p>
		</div>
	)
}
