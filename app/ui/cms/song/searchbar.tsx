'use client'

import debounce from '@/app/lib/debounce'
import { useRouter, useSearchParams } from 'next/navigation'

export function Searchbar() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const query = searchParams.get('query')
	const search = debounce((input: string) => {
		const params = new URLSearchParams(searchParams)
		params.delete('page')
		if (input) {
			params.set('query', input)
		} else {
			params.delete('query')
		}
		replace(`/cms/song/?${params.toString()}`)
	}, 500)
	return (
		<input
			name="search"
			type="text"
			placeholder="Search..."
			className="input input-bordered w-full"
			defaultValue={query?.toString()}
			aria-label="search"
			onChange={(e) => {
				search(e.target.value)
			}}
		/>
	)
}
