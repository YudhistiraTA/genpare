'use client'

import debounce from '@/app/lib/debounce'
import { useState } from 'react'

const MIN_LENGTH = 3

export function Suggestbar() {
	const [query, setQuery] = useState<string>()
	const handleSearch = debounce(
		(input) =>
			setQuery((prev) =>
				input.length < MIN_LENGTH
					? input.length === 0
						? undefined
						: prev
					: input,
			),
		500,
	)
	console.log(query)
	return <input onChange={(e) => handleSearch(e.target.value)} />
}
