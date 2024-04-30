'use client'

import { debounce } from '@/app/lib/debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function AlbumSearchbar() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const query = searchParams.get('q')
	const [inputValue, setInputValue] = useState(query?.toString() || '')
	const pathname = usePathname()
	const search = useMemo(
		() =>
			debounce((input: string) => {
				const params = new URLSearchParams(searchParams)
				params.delete('page')
				if (input) {
					params.set('q', input)
				} else {
					params.delete('q')
				}
				replace(`${pathname}?${params.toString()}`)
			}, 500),
		[replace, searchParams, pathname],
	)
	return (
		<div className="flex justify-center">
			<input
				name="search"
				type="text"
				placeholder="Search..."
				className="input input-bordered grow bg-white text-black"
				value={inputValue}
				aria-label="search"
				onChange={(e) => {
					setInputValue(e.target.value)
					search(e.target.value)
				}}
			/>
		</div>
	)
}
