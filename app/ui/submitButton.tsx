'use client'

import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button
			className={clsx('btn btn-primary w-fit', pending && 'btn-disabled')}
			aria-disabled={pending}
		>
			{pending ? (
				<>
					<span className="loading loading-ring loading-lg"></span>
					<p>Loading...</p>
				</>
			) : (
				<p>Submit</p>
			)}
		</button>
	)
}
