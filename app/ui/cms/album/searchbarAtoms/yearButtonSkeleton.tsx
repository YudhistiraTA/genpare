'use client'
import { useSearchParams } from 'next/navigation'

export function YearButtonSkeleton() {
	const searchParams = useSearchParams()
	const year = searchParams.get('year')
	return (
		<div tabIndex={0} role="button" className="btn btn-neutral lg:w-32 w-30 flex-nowrap">
			<span className="loading loading-spinner loading-sm"></span>
			{year || 'Release Year'}
		</div>
	)
}
