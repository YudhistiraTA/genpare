import { filterOptions } from '@/app/lib/api/cms/actor/tableData'
import { ActorTable } from '@/app/ui/cms/actor/actorTable'
import { ActorTableSkeleton } from '@/app/ui/cms/actor/actorTableSkeleton'
import { Searchbar } from '@/app/ui/cms/actor/searchbar'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Actor',
}

export default function Page({
	searchParams: { query, role, order },
}: {
	searchParams: {
		query: string
		role: 'artist' | 'circle' | 'translator'
		order: (typeof filterOptions)[number]['value']
	}
}) {
	return (
		<div className="px-6 flex flex-col gap-4 mb-4">
			<div className="pt-4 flex flex-col sticky top-0 bg-base-100 z-[1] pb-4 gap-4">
				<div className="flex grow justify-between">
					<Breadcrumb />
					<Link href="song/new">
						<button className="btn btn-primary">+ Add Song</button>
					</Link>
				</div>
				<Searchbar />
			</div>
			<div className="overflow-x-auto lg:p-4 lg:border-2 border rounded-xl border-neutral">
				<Suspense fallback={<ActorTableSkeleton />}>
					<ActorTable query={query} role={role} order={order} />
				</Suspense>
			</div>
		</div>
	)
}
