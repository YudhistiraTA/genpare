'use client'

import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

export function YearOptions({ years }: { years: number[] }) {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const year = searchParams.get('year')
	const changeYear = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		if (target === year) params.delete('year')
		else params.set('year', target)
		replace(`/cms/album/?${params.toString()}`, { scroll: false })
	}
	return (
		<>
			<div tabIndex={0} role="button" className="btn btn-neutral lg:w-32 w-30">
				{year || 'Release Year'}
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 border-2 border-[#343B45] mt-1"
			>
				{years.map((yearOption) => (
					<li
						key={`filter-${yearOption}`}
						className={clsx({
							'bg-[#343B45] rounded-lg': yearOption.toString() === year,
						})}
						onClick={() => changeYear(yearOption.toString())}
					>
						<p>{yearOption}</p>
					</li>
				))}
			</ul>
		</>
	)
}
