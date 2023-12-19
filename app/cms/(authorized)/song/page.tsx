import { SongTable } from '@/app/ui/cms/song/songTable'
import { Breadcrumb } from '@/app/ui/cms/breadcrumb'
import { Metadata } from 'next'
import { Searchbar } from '@/app/ui/cms/song/searchbar'
import { Language } from '@prisma/client'

export const metadata: Metadata = {
	title: 'Song',
}

export default function Page({
	searchParams: { query, untranslated, orderType = 'albumName' },
}: {
	searchParams: {
		query: string
		untranslated: Language
		orderType: 'albumName' | 'releaseYear' | 'latestEntry'
	}
}) {
	return (
		<div className="lg:pt-4 px-6 flex flex-col gap-4 mb-4">
			<div className='sticky top-0 w-full bg-base-100 z-[1]'>
				<Breadcrumb />
			</div>
			<Searchbar />
			<div className="overflow-x-auto lg:p-4 lg:border-2 border rounded-xl border-neutral">
				<SongTable
					query={query}
					untranslated={untranslated}
					orderType={orderType}
				/>
			</div>
		</div>
	)
}
