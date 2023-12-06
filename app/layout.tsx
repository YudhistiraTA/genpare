import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/app/ui/header'
import { Footer } from '@/app/ui/footer'
import { openSans } from '@/app/ui/fonts'
import styles from '@/app/ui/bg.module.css'

export const metadata: Metadata = {
	title: {
		template: '%s | Genpare Translation',
		default: 'Genpare Translation',
	},
	description: 'Genpare Translation Group Homepage also known as Gengo Parade',
	generator: 'Next.js',
	applicationName: 'Genpare Translation',
	alternates: { canonical: 'https://www.gengo-parade.com/' },
	referrer: 'origin-when-cross-origin',
	creator: 'Genpare Translation',
	keywords: ['Genpare', 'Translation', 'Gengo Parade', 'Doujin', 'Japanese'],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" data-theme="pastel">
			<body
				className={`${openSans.className} ${styles.horizontalBg} antialiased flex flex-col min-h-screen`}
			>
				<Header />
				<main className="flex flex-col grow py-4">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
