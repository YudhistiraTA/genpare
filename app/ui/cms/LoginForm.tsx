'use client'
import { authenticate } from '@/app/lib/api/cms/authenticate'
import clsx from 'clsx'
import { useFormState, useFormStatus } from 'react-dom'

export function LoginForm() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined)
	return (
		<form action={dispatch}>
			<div className="flex">
				<div className="block">
					<label htmlFor="key" className="label">
						Key
					</label>
					<input
						id="key"
						name="key"
						type="text"
						placeholder="Enter key"
						className="input-primary"
					></input>
				</div>
				<LoginButton />
			</div>
			<div
				className="flex h-8 items-end space-x-1"
				aria-live="polite"
				aria-atomic="true"
			>
				{errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
			</div>
		</form>
	)
}

function LoginButton() {
	const { pending } = useFormStatus()
	return (
		<button
			className={clsx('btn btn-accent', pending && 'btn-disabled')}
			aria-disabled={pending}
		>
			{pending ? 'Loading...' : 'Login'}
		</button>
	)
}
