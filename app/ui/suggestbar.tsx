'use client'

import debounce from '@/app/lib/debounce'
import { Album } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select, { components } from 'react-select'

const MIN_LENGTH = 3

export function Suggestbar({ className }: { className?: string }) {
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
		<>
			<form
				method="dialog"
				className="modal-backdrop absolute w-screen h-screen ring-transparent"
			>
				<button>close</button>
			</form>
			<div className={className}>
				<Select
					id="suggestbar"
					components={{
						DropdownIndicator: () => null,
						IndicatorSeparator: () => null,
						Option: (props) => (
							<components.Option {...props}>
								<p
									onClick={() => {
										push(`/album/${props.data.slug}`)
										;(
											document.getElementById('my_modal_2') as HTMLDialogElement
										)?.close()
									}}
									className="hover:cursor-pointer my-2"
								>
									{props.label}
								</p>
							</components.Option>
						),
						...(!options.length && { Menu: () => null }),
					}}
					options={options}
					onInputChange={handleSearch}
					filterOption={() => true}
					onChange={(newValue) => {
						push(`/album/${newValue?.slug}`)
						;(
							document.getElementById('my_modal_2') as HTMLDialogElement
						)?.close()
					}}
					className='rounded-xl'
					placeholder='search...'
				/>
			</div>
		</>
	)
}
