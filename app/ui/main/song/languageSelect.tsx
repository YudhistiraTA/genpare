'use client'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

export function LanguageSelect({
	main,
	sub,
	options,
	className,
}: {
	main: string
	sub: string
	options: string[]
	className?: string
}) {
	const hasEnglish = options.includes('English')
	const selectedMain = main ?? 'Japanese'
	const selectedSub = sub ?? (hasEnglish ? 'English' : 'Romaji')
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const handleChange = (
		e: ChangeEvent<HTMLSelectElement>,
		type: 'main' | 'sub',
	) => {
		const params = new URLSearchParams(searchParams)
		params.set(type, e.target.value)
		replace(`${pathname}?${params.toString()}`, { scroll: false })
	}
	const handleSwap = () => {
		const params = new URLSearchParams(searchParams)
		params.set('main', selectedSub)
		params.set('sub', selectedMain)
		replace(`${pathname}?${params.toString()}`, { scroll: false })
	}
	return (
		<section
			className={clsx(
				'flex lg:flex-row flex-col w-full justify-between lg:gap-4',
				className,
			)}
		>
			<div className="flex flex-col grow">
				<div className="label">
					<label htmlFor="main-language" className="label-text">
						Pick main language
					</label>
				</div>
				<select
					id="main-language"
					className="select select-sm select-secondary w-full max-w-xs"
					onChange={(e) => handleChange(e, 'main')}
					value={selectedMain}
				>
					{options.map((option) => (
						<option
							key={`main_${option}`}
							value={option}
							disabled={selectedSub === option}
						>
							{option}
						</option>
					))}
				</select>
			</div>
			<svg
				version="1.1"
				id="ios7_x5F_arrows_1_"
				xmlns="http://www.w3.org/2000/svg"
				x="0"
				y="0"
				viewBox="0 0 128 128"
				xmlSpace="preserve"
				width={20}
				className="lg:self-end self-center mt-4 lg:mt-0 lg:pb-1 hover:cursor-pointer hover:scale-125 transition-transform rotate-90 lg:rotate-0"
				onClick={handleSwap}
			>
				<style>{`.st0{display:none}.st1{display:inline}`}</style>
				<g id="_x33_4_1_">
					<path
						d="M33.8 53.3 30 49.5-.1 79.7 30 109.9l3.8-3.8L10 82.3h63.2v-5.2H10l23.8-23.8zm94.1-5.1L97.8 18.1 94 21.9l23.8 23.8h-63v5.2h63L94.1 74.8l3.8 3.8L128 48.5v-.3h-.1z"
						id="icon_8_"
					/>
				</g>
			</svg>
			<div className="flex flex-col grow">
				<div className="label">
					<label htmlFor="sub-language" className="label-text">
						Pick sub language
					</label>
				</div>
				<select
					id="sub-language"
					onChange={(e) => handleChange(e, 'sub')}
					className="select select-sm select-secondary w-full max-w-xs"
					value={selectedSub}
				>
					{options.map((option) => (
						<option
							key={`sub_${option}`}
							value={option}
							disabled={selectedMain === option}
						>
							{option}
						</option>
					))}
				</select>
			</div>
		</section>
	)
}
