import { filterOptions } from '@/app/lib/api/cms/album/tableData'
import { AlbumTable } from '@/app/ui/cms/album/albumTable'
import { AlbumTableSkeleton } from '@/app/ui/cms/album/albumTableSkeleton'
import { Searchbar } from '@/app/ui/cms/album/searchbar'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Album',
}

export default function Page({
	searchParams: { order, query, year },
}: {
	searchParams: {
		query: string
		year: string
		order: (typeof filterOptions)[number]['value']
	}
}) {
	return (
		<div className="px-6 flex flex-col gap-4 mb-4">
			<div className="pt-4 flex flex-col sticky top-0 bg-base-100 z-[1] pb-4 gap-4">
				<div className="flex grow justify-between">
					<Breadcrumb />
					<Link href="album/new">
						<button className="btn btn-primary">+ Add Song</button>
					</Link>
				</div>
				<Searchbar />
			</div>
			<div className="overflow-x-auto lg:p-4 lg:border-2 border rounded-xl border-neutral">
				<Suspense fallback={<AlbumTableSkeleton />}>
					<AlbumTable query={query} year={year} order={order} />
				</Suspense>
			</div>
		</div>
	)
}
