import { cherryBomb } from '@/app/ui/main/fonts'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
	return (
		<div className="navbar min-h-max shadow-2xl z-10 justify-between lg:px-96 bg-neutral">
			<div className="">
				<Link
					href="/"
					className="rounded-xl"
				>
					<Image
						src="/logo.webp"
						alt="genpare logo"
						width={60}
						height={60}
						className="rounded-full border-2 border-primary"
					/>
				</Link>
				<Link
					href="/"
					className={`${cherryBomb.className} text-xl text-[#fcdba8] drop-shadow-[0_1.2px_1.2px_rgba(91,50,43,1)] lg:text-3xl tracking-tight ml-2`}
				>
					Gengo Parade
				</Link>
			</div>
			<div className="dropdown dropdown-end lg:hidden">
				<div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
					<Image src="/menu.svg" alt="menu" width={30} height={30} />
				</div>
				<ul
					tabIndex={0}
					className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 gap-4"
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
