import { comfortaa } from '@/app/ui/main/fonts'
import Image from 'next/image'
import Link from 'next/link'

export function MobileNavbar() {
	return (
		<div className="w-full navbar lg:hidden">
			<div className="flex-none lg:hidden w-full">
				<label
					htmlFor="my-drawer-3"
					aria-label="open sidebar"
					className="btn btn-square btn-ghost"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
				<div className="flex justify-between items-center w-full">
					<Link href="/cms">
						<p className={comfortaa.className}>Gengo Parade CMS</p>
					</Link>
					<Link href="/cms">
						<Image
							src="/logo.webp"
							alt="genpare logo"
							width={36}
							height={36}
							className="rounded-full"
							priority
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}
