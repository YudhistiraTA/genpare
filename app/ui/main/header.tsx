import { cherryBomb } from '@/app/ui/main/fonts'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
	return (
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
					className={`${cherryBomb.className} btn btn-ghost text-xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] lg:text-3xl tracking-tight`}
				>
					Gengo Parade
				</Link>
			</div>
			<div className="navbar-end"></div>
		</div>
	)
}
export default Header