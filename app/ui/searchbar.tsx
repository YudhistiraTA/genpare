'use client'

import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { forwardRef } from 'react'

const Searchbar = forwardRef<
	HTMLFormElement,
	{ placeholder: string; className?: string; onSubmit: () => void }
>(({ placeholder, className, onSubmit }, ref) => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const query = searchParams.get('query')
	const search = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		if (e.currentTarget.searchbar.value) {
			params.set('query', e.currentTarget.searchbar.value)
		} else {
			params.delete('query')
		}
		replace(`/?${params.toString()}`)
		onSubmit()
	}
	return (
		<div className={clsx('relative flex', className)}>
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<form onSubmit={search} ref={ref}>
				<input
					id="searchbar"
					className="input input-bordered input-secondary w-full shadow"
					placeholder={placeholder}
					defaultValue={query?.toString()}
					aria-label="search"
				/>
			</form>
		</div>
	)
})

Searchbar.displayName = 'Searchbar'
export default Searchbar
