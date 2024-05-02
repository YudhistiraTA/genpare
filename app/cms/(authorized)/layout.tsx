import { MobileNavbar } from '@/app/ui/cms/mobileNavbar'
import { Sidebar } from '@/app/ui/cms/sidebar'
import { Metadata } from 'next'
import styles from './cms.module.css'
export const metadata: Metadata = {
	robots: {
		follow: false,
		index: false,
	},
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${styles.cmsWrapper} drawer lg:drawer-open lg:overflow-visible overflow-auto min-h-screen antialiased`}
		>
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col overflow-y-clip">
				<MobileNavbar />
				<div id="cms-content" style={{ maxWidth: '100vw' }}>
					{children}
				</div>
			</div>
			<Sidebar />
		</div>
	)
}
