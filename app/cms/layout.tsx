import { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		template: '%s | Gengo Parade CMS',
		default: 'Gengo Parade CMS',
	},
	robots: {
		follow: false,
		index: false,
	},
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return <main className='bg-black'>{children}</main>
}
