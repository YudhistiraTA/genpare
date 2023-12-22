'use client'

import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function PaginationButton({
	type,
	disabled = false,
}: {
	type: 'prev' | 'next'
	disabled: boolean
}) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const page = Number(searchParams.get('page') || '1')
	const targetPage = type === 'prev' ? page - 1 : page + 1
	const { replace } = useRouter()
	const changePage = () => {
		const params = new URLSearchParams(searchParams)
		params.set('page', String(targetPage > 0 ? targetPage : 1))
		replace(`${pathname}?${params.toString()}`, { scroll: false })
	}
	return (
		<button
			className="btn btn-neutral btn-sm"
			disabled={disabled}
			onClick={changePage}
		>
			<svg
				width="24px"
				height="24px"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={clsx({ 'rotate-180': type === 'prev' })}
			>
				<g id="next">
					<g id="next_2">
						<path
							id="Combined Shape"
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.9792 32.3759L8.69035 39.3951C6.69889 40.7537 3.99878 39.3269 3.99878 36.917V11.005C3.99878 8.59361 6.69843 7.166 8.69028 8.52489L27.6843 21.4809C29.4304 22.672 29.4304 25.249 27.6843 26.4371L20.9792 31.0114V36.9144C20.9792 37.7185 21.8791 38.1937 22.5432 37.7406L41.5107 24.787C42.0938 24.3882 42.0938 23.5316 41.5112 23.1342L22.5436 10.1805C21.8791 9.72714 20.9792 10.2023 20.9792 11.0064V11.9464C20.9792 12.4987 20.5315 12.9464 19.9792 12.9464C19.4269 12.9464 18.9792 12.4987 18.9792 11.9464V11.0064C18.9792 8.59492 21.6789 7.16945 23.6711 8.52861L42.6387 21.4823C44.3845 22.6732 44.3845 25.2446 42.6391 26.4382L23.6707 39.3925C21.6789 40.7514 18.9792 39.3259 18.9792 36.9144V32.3759ZM18.9792 29.9548L7.56322 37.7429C6.89939 38.1958 5.99878 37.7199 5.99878 36.917V11.005C5.99878 10.2003 6.89924 9.72409 7.56321 10.1771L26.5573 23.1331C27.1391 23.53 27.1391 24.389 26.5582 24.7842L20.9792 28.5904V24.9184C20.9792 24.3661 20.5315 23.9184 19.9792 23.9184C19.4269 23.9184 18.9792 24.3661 18.9792 24.9184V29.9548Z"
							fill="currentColor"
						/>
					</g>
				</g>
			</svg>
		</button>
	)
}
