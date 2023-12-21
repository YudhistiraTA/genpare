'use client'
import {debounce} from '@/app/lib/debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function InputField() {
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
		replace(`/cms/album/?${params.toString()}`)
	}, 500)
	return (
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
	)
}
