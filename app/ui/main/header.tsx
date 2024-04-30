import { cherryBomb } from '@/app/ui/main/fonts'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
	return (
		<div className="navbar min-h-max shadow-2xl z-10 justify-between lg:px-96 bg-primary text-base-100">
			<div className="">
				<Link href="/" className="rounded-xl">
					<Image
						src="/logo.webp"
						alt="genpare logo"
						width={60}
						height={60}
						className="rounded-full border-2 border-base-100"
					/>
				</Link>
				<Link
					href="/"
					className={`${cherryBomb.className} text-xl text-base-100 drop-shadow-[0_1.2px_1.2px_rgba(91,50,43,1)] lg:text-3xl tracking-tight ml-2`}
				>
					Gengo Parade
				</Link>
			</div>
			<div className="dropdown dropdown-end lg:hidden">
				<div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
					<svg
						width="32px"
						height="32px"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
					>
						<path
							fill="currentColor"
							fillRule="evenodd"
							d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
						/>
					</svg>
				</div>
				<ul
					tabIndex={0}
					className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 gap-4 text-primary"
				>
					<li>
						<Link href="/album">ALBUMS</Link>
					</li>
					<li>
						<Link href="/song">TRANSLATIONS</Link>
					</li>
					<li>
						<Link href="/about">ABOUT</Link>
					</li>
				</ul>
			</div>
			<div className="hidden lg:block">
				<ul className="menu-horizontal gap-16">
					<li>
						<Link href="/album">ALBUMS</Link>
					</li>
					<li>
						<Link href="/song">TRANSLATIONS</Link>
					</li>
					<li>
						<Link href="/about">ABOUT</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
export default Header
