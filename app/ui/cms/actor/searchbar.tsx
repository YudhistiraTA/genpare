'use client'

import { filterOptions, roleOptions } from '@/app/lib/api/cms/actor/tableData'
import { capitalize } from '@/app/lib/capitalize'
import debounce from '@/app/lib/debounce'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Searchbar() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const query = searchParams.get('query')
	const [inputValue, setInputValue] = useState(query?.toString() || '')
	useEffect(() => {
		setInputValue(query?.toString() || '')
	}, [query])
	const search = debounce((input: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		if (input) {
			params.set('query', input)
		} else {
			params.delete('query')
		}
		replace(`/cms/actor/?${params.toString()}`)
	}, 500)

	const role = searchParams.get('role')
	const changeRole = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		params.delete('query')
		if (target === role) params.delete('role')
		else params.set('role', target)
		replace(`/cms/actor/?${params.toString()}`, { scroll: false })
	}

	const filterChange = (target: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		params.set('order', target)
		replace(`/cms/actor/?${params.toString()}`, { scroll: false })
	}

	const clearFilter = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('query')
		params.delete('order')
		params.delete('role')
		replace(`/cms/actor/?${params.toString()}`, { scroll: false })
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
						{role ? capitalize(role) : 'Role'}
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 border-2 border-[#343B45] mt-1"
					>
						{roleOptions.map((roleOption) => (
							<li
								key={`filter-${roleOption}`}
								onClick={() => changeRole(roleOption)}
								className={clsx({
									'bg-[#343B45] rounded-lg': role === roleOption,
								})}
							>
								<p>{capitalize(roleOption)}</p>
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
						className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 border-2 border-[#343B45] mt-1"
					>
						{filterOptions.map(({ value, label }) => (
							<li
								key={`filter-${value}`}
								onClick={() => filterChange(value)}
								className={clsx({
									'bg-[#343B45] rounded-lg':
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
