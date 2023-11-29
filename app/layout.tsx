import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/app/ui/header'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={`${inter.className} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	)
}
