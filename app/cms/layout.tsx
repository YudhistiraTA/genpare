import { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		template: '%s | Gengo Parade CMS',
		default: 'Gengo Parade CMS',
	},
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return children
}
