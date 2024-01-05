'use client'
import { authenticate } from '@/app/lib/api/cms/authenticate'
import clsx from 'clsx'
import { useFormState, useFormStatus } from 'react-dom'
import styles from '@/app/ui/cms/glow.module.css'

// renamed
export function LoginForm() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined)
	return (
		<form action={dispatch}>
			<div className={clsx('bg-white p-4 card', styles.glow)}>
				<div className="block">
					<label htmlFor="key" className="label">
						Key
					</label>
					<input
						id="key"
						name="key"
						type="text"
						placeholder="Enter key"
						className={clsx(
							'input input-bordered',
							errorMessage && 'input-error',
						)}
						autoFocus
					></input>
				</div>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{errorMessage && (
						<p className="text-sm text-red-500">{errorMessage}</p>
					)}
				</div>
				<LoginButton />
			</div>
		</form>
	)
}

function LoginButton() {
	const { pending } = useFormStatus()
	return (
		<button
			className={clsx('btn btn-neutral rounded', pending && 'btn-disabled')}
			aria-disabled={pending}
		>
			{pending ? (
				<>
					<span className="loading loading-ring loading-lg"></span>
					<p>Loading...</p>
				</>
			) : (
				<p>Login</p>
			)}
		</button>
	)
}
