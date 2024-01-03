'use client'

import { filterOptions } from '@/app/lib/api/cms/song/tableData'
import { capitalize } from '@/app/lib/capitalize'
import { debounce } from '@/app/lib/debounce'
import { Language } from '@prisma/client'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export function Searchbar() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const query = searchParams.get('query')
	const [inputValue, setInputValue] = useState(query?.toString() || '')
	const search = useMemo(
		() =>
			debounce((input: string) => {
				const params = new URLSearchParams(searchParams)
				params.delete('page')
				if (input) {
					params.set('query', input)
				} else {
					params.delete('query')
				}
				replace(`/cms/song/?${params.toString()}`)
			}, 500),
		[replace, searchParams],
	)

	const untranslated = searchParams.get('untranslated')
	const changeUntranslated = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		params.delete('query')
		if (target === untranslated) params.delete('untranslated')
		else params.set('untranslated', target)
		replace(`/cms/song/?${params.toString()}`, { scroll: false })
	}

	const filterChange = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		params.set('order', target)
		replace(`/cms/song/?${params.toString()}`, { scroll: false })
	}

	const clearFilter = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('query')
		params.delete('order')
		params.delete('untranslated')
		replace(`/cms/song/?${params.toString()}`, { scroll: false })
	}

	return (
		<div className="flex gap-4 lg:flex-row flex-col">
			<input
				name="search"
				type="text"
				placeholder="Search..."
				className="input input-bordered grow"
				value={inputValue}
				aria-label="search"
				onChange={(e) => {
					setInputValue(e.target.value)
					search(e.target.value)
				}}
			/>
			<div className="flex gap-2">
				<div className="dropdown lg:dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-neutral lg:w-32 w-30"
					>
						{untranslated
							? `No ${capitalize(untranslated)} Available`
							: 'Filter'}
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 border-2 border-default mt-1"
					>
						{Object.keys(Language)
							.filter((language) => language !== 'japanese')
							.map((language) => (
								<li
									key={`filter-${language}`}
									onClick={() => changeUntranslated(language)}
									className={clsx({
										'bg-default rounded-lg': language === untranslated,
									})}
								>
									<p>No {capitalize(language)} Available</p>
								</li>
							))}
					</ul>
				</div>
				<div className="dropdown lg:dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-neutral lg:w-32 w-30"
					>
						{filterOptions.find(
							({ value }) => value === searchParams.get('order'),
						)?.label || filterOptions[0].label}
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 border-2 border-default mt-1"
					>
						{filterOptions.map(({ value, label }) => (
							<li
								key={`filter-${value}`}
								onClick={() => filterChange(value)}
								className={clsx({
									'bg-default rounded-lg':
										value === searchParams.get('order'),
								})}
							>
								<p>{label}</p>
							</li>
						))}
					</ul>
				</div>
				<button
					className="btn btn-neutral lg:w-32 w-30"
					onClick={clearFilter}
					disabled={!searchParams.size}
				>
					Clear filters
				</button>
			</div>
		</div>
	)
}
