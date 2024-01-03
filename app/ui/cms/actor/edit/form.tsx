'use client'
import { editActor } from '@/app/lib/api/cms/actor/editActor'
import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'
import { DeleteButton } from '@/app/ui/cms/actor/edit/deleteButton'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import { SubmitButton } from '@/app/ui/submitButton'
import { Role } from '@prisma/client'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
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
			<InputField
				label="Slug"
				id="slug"
				name="slug"
				errorArray={state.errors?.slug}
				defaultValue={data.slug}
			/>
			<SelectField
				id="role"
				name="role"
				label="Role"
				errorArray={state.errors?.role}
				options={Object.values(Role).map((role) => ({ id: role, name: role }))}
				defaultValue={data.role}
			/>
			<div className="flex gap-4 w-full">
				<SubmitButton />
				<DeleteButton data={data} />
			</div>
		</form>
	)
}
