'use client'
import { editActor } from '@/app/lib/api/cms/actor/editActor'
import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'
import { DeleteButton } from '@/app/ui/cms/actor/edit/deleteButton'
import { InputField } from '@/app/ui/cms/inputField'
import { Role } from '@prisma/client'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'

export function Form({
	data,
}: {
	data: Awaited<ReturnType<typeof fetchActor>>
}) {
	const [state, dispatch] = useFormState(editActor, {
		errors: {},
		message: '',
	})
	useEffect(() => {
		if (state.message) {
			toast.error(state.message, {
				style: { backgroundColor: '#272F38', color: 'white' },
			})
		}
	}, [state])
	return (
		<form action={dispatch} className="grid grid-cols-1 gap-4">
			<Toaster />
			<input type="hidden" name="id" id="id" defaultValue={data.id} />
			<InputField
				label="Name"
				id="name"
				name="name"
				errorArray={state.errors?.name}
				defaultValue={data.name}
			/>
			<div className="flex flex-col">
				<label htmlFor="slug">
					<p>Slug</p>
				</label>
				<input
					className="input input-bordered w-full"
					id="slug"
					name="slug"
					type="text"
					aria-describedby="slug-error"
					defaultValue={data.slug}
				/>
				<div id="slug-error" aria-live="polite" aria-atomic="true">
					{state.errors?.slug &&
						state.errors.slug.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className="flex flex-col">
				<label htmlFor="role">Role</label>
				<select
					id="role"
					name="role"
					placeholder="Role"
					className="select select-bordered w-full"
					defaultValue={data.role}
					aria-describedby="role-error"
				>
					<option value="">Role</option>
					{Object.values(Role).map((role, index) => (
						<option key={index} value={role}>
							{role}
						</option>
					))}
				</select>
				<div id="role-error" aria-live="polite" aria-atomic="true">
					{state.errors?.role &&
						state.errors.role.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className="flex justify-between w-full">
				<SubmitButton />
				<DeleteButton data={data} />
			</div>
		</form>
	)
}

function SubmitButton() {
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
