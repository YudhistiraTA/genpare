'use client'

import { cherryBomb } from '@/app/ui/fonts'
import Searchbar from '@/app/ui/searchbar'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function Header() {
	const path = usePathname()
	const isRoot = path === '/'
	const [displaySearch, setDisplaySearch] = useState(false)
	const searchRef = useRef<HTMLFormElement>(null)
	const mobileSearchRef = useRef<HTMLFormElement>(null)
	useEffect(() => {
		if (isRoot) setDisplaySearch(false)
	}, [isRoot])
	const clickEvent = (ref: typeof searchRef) => {
		if (isRoot && ref.current) {
			ref.current.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true }),
			)
		} else if (displaySearch && ref.current) {
			if ((ref.current.elements[0] as HTMLInputElement).value) {
				ref.current.dispatchEvent(
					new Event('submit', { cancelable: true, bubbles: true }),
				)
			} else setDisplaySearch(false)
		} else {
			setDisplaySearch(true)
			document.getElementById('searchbar')?.focus()
		}
	}
	const handleClick = () => clickEvent(searchRef)
	const handleMobileClick = () => clickEvent(mobileSearchRef)
	return (
		<>
			<div className="navbar mt-4 lg:px-6 min-h-max">
				<div className="navbar-start">
					<Link
						href="/"
						className="hover:bg-slate-300 transition-colors rounded-xl"
					>
						<Image
							src="/logo.webp"
							alt="genpare logo"
							width={60}
							height={60}
							className="rounded-full border-2 border-secondary"
						/>
					</Link>
				</div>
				<div className="navbar-center">
					<Link
						href="/"
						className={`${cherryBomb.className} btn btn-ghost text-xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] lg:text-3xl tracking-tighter`}
					>
						Gengo Parade
					</Link>
				</div>
				<div className="navbar-end">
					{(isRoot || displaySearch) && (
						<Searchbar
							onSubmit={() => setDisplaySearch(false)}
							ref={searchRef}
							placeholder="Search..."
							className="lg:mr-4 lg:block hidden"
						/>
					)}
					<button
						className="btn btn-ghost btn-circle lg:flex hidden"
						onClick={handleClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button
						className="btn btn-ghost btn-circle lg:hidden flex"
						onClick={handleMobileClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
			{(isRoot || displaySearch) && (
				<Searchbar
					onSubmit={() => setDisplaySearch(false)}
					ref={mobileSearchRef}
					placeholder="Search..."
					className="lg:mr-4 lg:hidden block self-center"
				/>
			)}
		</>
	)
}
