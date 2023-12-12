import { signIn } from '@/auth'

type AuthError = {
	digest: string
	stack: string
	message: string
}
function isAuthError(error: any): error is AuthError {
	return (
		error &&
		typeof error.digest === 'string' &&
		typeof error.stack === 'string' &&
		typeof error.message === 'string'
	)
}

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData)
	} catch (error) {
		console.log(error)
		if (isAuthError(error) && error.stack.includes('CredentialsSignin'))
			return 'Invalid key'
		return 'Unknown error'
	}
}
