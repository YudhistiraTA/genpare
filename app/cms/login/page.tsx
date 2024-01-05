import { LoginForm } from '@/app/ui/cms/LoginForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Login',
}
export default function Page() {
	return (
		<div className="flex h-screen min-w-full justify-center items-center">
			<LoginForm />
		</div>
	)
}
