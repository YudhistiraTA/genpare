import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { CountStats } from '@/app/ui/cms/dashboard/countStats'
import { LanguageStats } from '@/app/ui/cms/dashboard/languageStats'
import { StatsSkeleton } from '@/app/ui/cms/dashboard/statsSkeleton'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Page() {
	return (
		<div className="lg:pt-4 px-6">
			<Breadcrumb />
			<p className="text-2xl my-2">Genpare Dashboard</p>
			<Suspense fallback={<StatsSkeleton numberOfStats={6} />}>
				<CountStats />
			</Suspense>
			<p className="text-2xl my-2">Translation Status</p>
			<Suspense fallback={<StatsSkeleton numberOfStats={5} />}>
				<LanguageStats />
			</Suspense>
			<p className="text-2xl my-2">Quick Create</p>
			<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
				<Link href={`/cms/actor/new`} className="stat hover:bg-[#343B45]">
					<div className="stat-value">Actor</div>
				</Link>
				<Link href={`/cms/album/new`} className="stat hover:bg-[#343B45]">
					<div className="stat-value">Album</div>
				</Link>
				<Link href={`/cms/song/new`} className="stat hover:bg-[#343B45]">
					<div className="stat-value">Song</div>
				</Link>
			</div>
		</div>
	)
}
