import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/app/ui/header'
import { Footer } from '@/app/ui/footer'
import { openSans } from '@/app/ui/fonts'
import styles from '@/app/ui/bg.module.css'

export const metadata: Metadata = {
	metadataBase: new URL('https://www.gengo-parade.com/'),
	title: {
		template: '%s | Genpare Translation',
		default: 'Genpare Translation',
	},
	description: 'Gengo Parade Translation Homepage',
	generator: 'Next.js',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://www.gengo-parade.com/',
		siteName: 'Genpare Translation',
		description: 'Gengo Parade Translation Homepage',
		images: [
			{
				url: 'https://www.gengo-parade.com/logo.webp',
				alt: 'Genpare Translation',
			},
		],
		title: {
			template: '%s | Genpare Translation',
			default: 'Genpare Translation',
		},
	},
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
