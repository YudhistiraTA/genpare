import { MobileNavbar } from '@/app/ui/cms/mobileNavbar'
import { Sidebar } from '@/app/ui/cms/sidebar'
import { Metadata } from 'next'
export const metadata: Metadata = {
	robots: {
		follow: false,
		index: false,
	},
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="drawer lg:drawer-open lg:overflow-visible overflow-auto min-h-screen">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col overflow-y-clip">
				<MobileNavbar />
				<div id='cms-content' style={{maxWidth: '100vw'}}>{children}</div>
			</div>
			<Sidebar />
		</div>
	)
}
