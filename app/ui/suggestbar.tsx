'use client'

import debounce from '@/app/lib/debounce'
import { Album } from '@prisma/client'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const MIN_LENGTH = 3

export function Suggestbar() {
	const [query, setQuery] = useState<string>()
	const [options, setOptions] = useState<
		(Album & { label: string; value: string })[]
	>([])
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
	useEffect(() => {
		const loadOptions = async () => {
			const response = await fetch(`/api/album?q=${query}`)
			const albums: Album[] = await response.json()
			setOptions(
				albums.map((album) => ({
					...album,
					label: album.name,
					value: album.id,
				})),
			)
		}
		loadOptions()
	}, [query])

	return (
		<Select
			components={{
				DropdownIndicator: () => null,
				IndicatorSeparator: () => null,
			}}
			options={options}
			onInputChange={handleSearch}
			className="w-52"
		/>
	)
}
