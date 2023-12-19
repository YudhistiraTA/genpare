import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { CountStats } from '@/app/ui/cms/dashboard/countStats'
import { LanguageStats } from '@/app/ui/cms/dashboard/languageStats'
import { LanguageStatsSkeleton } from '@/app/ui/cms/dashboard/languageStatsSkeleton'
import { Suspense } from 'react'

export default function Page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<p className="text-2xl my-2">Genpare Dashboard</p>
			<CountStats />
			<p className="text-2xl my-2">Translation Status</p>
			<Suspense fallback={<LanguageStatsSkeleton />}>
				<LanguageStats />
			</Suspense>
		</div>
	)
}
