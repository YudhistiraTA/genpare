'use client'

import debounce from '@/app/lib/debounce'
import { Album } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select, { components } from 'react-select'

const MIN_LENGTH = 3

export function Suggestbar() {
	const { push } = useRouter()
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
				Option: (props) => (
					<components.Option {...props}>
						<p
							onClick={() => push(`/album/${props.data.slug}`)}
							className="hover:cursor-pointer"
						>
							{props.label}
						</p>
					</components.Option>
				),
				...(!options.length && { Menu: () => null }),
			}}
			options={options}
			onInputChange={handleSearch}
			className="w-full"
			filterOption={() => true}
			onChange={(newValue) => push(`/album/${newValue?.slug}`)}
		/>
	)
}
