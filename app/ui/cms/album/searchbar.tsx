import { ClearFilter } from '@/app/ui/cms/album/searchbarAtoms/clearFilter'
import { InputField } from '@/app/ui/cms/album/searchbarAtoms/inputField'
import { SortButton } from '@/app/ui/cms/album/searchbarAtoms/sortButton'
import { YearButton } from '@/app/ui/cms/album/searchbarAtoms/yearButton'
import { YearButtonSkeleton } from '@/app/ui/cms/album/searchbarAtoms/yearButtonSkeleton'
import { Suspense } from 'react'

export function Searchbar() {
	return (
		<div className="flex gap-4 lg:flex-row flex-col">
			<InputField />
			<div className="flex gap-2">
				<Suspense fallback={<YearButtonSkeleton />}>
					<YearButton />
				</Suspense>
				<SortButton />
				<ClearFilter />
			</div>
		</div>
	)
}
