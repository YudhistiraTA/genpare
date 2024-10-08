import { roboto } from '@/app/ui/main/fonts'
import Footer from '@/app/ui/main/footer'
import Header from '@/app/ui/main/header'
import { Metadata } from 'next'

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

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`${roboto.className} antialiased flex flex-col min-h-screen text-secondary`}
		>
			<Header />
			<main className="flex flex-col grow">{children}</main>
			<Footer />
		</div>
	)
}
