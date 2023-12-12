import { openSans } from '@/app/ui/main/fonts'
import { Footer } from '@/app/ui/main/footer'
import { Header } from '@/app/ui/main/header'
import styles from '@/app/ui/main/bg.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${openSans.className} ${styles.horizontalBg} antialiased flex flex-col min-h-screen`}
		>
			<Header />
			<main className="flex flex-col grow py-4">{children}</main>
			<Footer />
		</div>
	)
}
