import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { CountStats } from '@/app/ui/cms/dashboard/countStats'
import { HistoryTable } from '@/app/ui/cms/dashboard/historyTable'
import { HistoryTableSkeleton } from '@/app/ui/cms/dashboard/historyTableSkeleton'
import { LanguageStats } from '@/app/ui/cms/dashboard/languageStats'
import { StatsSkeleton } from '@/app/ui/cms/dashboard/statsSkeleton'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Page({
	searchParams: { page = '1' },
}: {
	searchParams: { page: string }
}) {
	return (
		<div className="lg:pt-4 lg:pb-0 pb-4 px-6">
			<Breadcrumb />
			<p className="text-2xl my-2">Genpare Dashboard</p>
			<div className="lg:border-2 border rounded-2xl border-neutral lg:w-fit">
				<Suspense fallback={<StatsSkeleton numberOfStats={6} />}>
					<CountStats />
				</Suspense>
			</div>
			<p className="text-2xl my-2">Translation Status</p>
			<div className="lg:border-2 border rounded-2xl border-neutral lg:w-fit">
				<Suspense fallback={<StatsSkeleton numberOfStats={5} />}>
					<LanguageStats />
				</Suspense>
			</div>
			<p className="text-2xl my-2">Quick Create</p>
			<div className="lg:border-2 border rounded-2xl border-neutral lg:w-fit">
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
			<p className="text-2xl my-2">Change History</p>
			<div className="lg:border-2 border rounded-2xl border-neutral mt-4 lg:w-fit overflow-x-auto">
				<Suspense fallback={<HistoryTableSkeleton />}>
					<HistoryTable page={Number(page)} />
				</Suspense>
			</div>
		</div>
	)
}
