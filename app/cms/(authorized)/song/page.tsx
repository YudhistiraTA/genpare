import { SongTable } from '@/app/ui/cms/song/songTable'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Metadata } from 'next'
import { Searchbar } from '@/app/ui/cms/song/searchbar'
import { Language } from '@prisma/client'
import { Suspense } from 'react'
import { SongTableSkeleton } from '@/app/ui/cms/song/songTableSkeleton'
import { filterOptions } from '@/app/lib/api/cms/song/tableData'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Song',
}

export default function Page({
	searchParams: { query, untranslated, order },
}: {
	searchParams: {
		query: string
		untranslated: Language
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
				<Suspense fallback={<SongTableSkeleton />}>
					<SongTable query={query} untranslated={untranslated} order={order} />
				</Suspense>
			</div>
		</div>
	)
}
