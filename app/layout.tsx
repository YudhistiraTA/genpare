import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/app/ui/header'
import { Footer } from '@/app/ui/footer'
import { openSans } from '@/app/ui/fonts'

export const metadata: Metadata = {
	title: 'Gengo Parade',
	description: 'Genpare Translation',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" data-theme="cupcake">
			<body
				className={`${openSans.className} antialiased bg-primary bg-opacity-5 flex flex-col min-h-screen`}
			>
				<Header />
				<main className="flex flex-col grow py-4">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
