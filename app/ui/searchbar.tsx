'use client'

import debounce from '@/app/lib/debounce'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Searchbar({ placeholder, className }: { placeholder: string, className?: string }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const handleSearch = debounce((term: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 500)
	return (
		<div className={clsx("relative flex flex-1 flex-shrink-0", className)}>
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				id='searchbar'
				className="input input-bordered input-secondary w-full"
				placeholder={placeholder}
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={searchParams.get('query')?.toString()}
			/>
		</div>
	)
}
