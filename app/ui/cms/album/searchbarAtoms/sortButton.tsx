'use client'
import { filterOptions } from '@/app/lib/api/cms/album/tableData'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

export function SortButton() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const filterChange = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		params.set('order', target)
		replace(`/cms/album/?${params.toString()}`, { scroll: false })
	}
	return (
		<div className="dropdown lg:dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-neutral lg:w-32 w-30">
				{filterOptions.find(({ value }) => value === searchParams.get('order'))
					?.label || filterOptions[0].label}
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 border-2 border-[#343B45] mt-1"
			>
				{filterOptions.map(({ value, label }) => (
					<li
						key={`filter-${value}`}
						onClick={() => filterChange(value)}
						className={clsx({
							'bg-[#343B45] rounded-lg': searchParams.get('order')
								? value === searchParams.get('order')
								: value === 'last-updated',
						})}
					>
						<p>{label}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
