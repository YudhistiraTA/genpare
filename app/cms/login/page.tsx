import { LoginForm } from '@/app/ui/cms/LoginForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
	robots: {
		follow: false,
		index: false,
	},
}
export default function Page() {
	return <LoginForm />
}
