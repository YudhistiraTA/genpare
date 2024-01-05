'use client'

import { useRouter, useSearchParams } from "next/navigation"

export function ClearFilter() {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
  const clearFilter = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('query')
		params.delete('order')
		params.delete('year')
		replace(`/cms/album/?${params.toString()}`, { scroll: false })
	}
	return (
		<button
			className="btn btn-neutral lg:w-32 w-30"
			onClick={clearFilter}
			disabled={!searchParams.size}
		>
			Clear filters
		</button>
	)
}
