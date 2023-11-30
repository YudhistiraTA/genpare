'use client'

import { Suggestbar } from '@/app/ui/suggestbar'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	const handleClick = () => {
		const element = document.getElementById('searchbar')
		if (element) {
			element.focus()
		} else {
			;(document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()
			document.getElementById('suggestbar')?.focus()
		}
	}
	return (
		<>
			<div className="navbar bg-secondary bg-opacity-60 lg:px-6 rounded-b-2xl">
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
					<Link href="/" className="btn btn-ghost text-xl">
						Gengo Parade
					</Link>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle" onClick={handleClick}>
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
			<dialog id="my_modal_2" className="modal">
				<Suggestbar className="modal-top w-full px-12 lg:px-48" />
			</dialog>
		</>
	)
}
