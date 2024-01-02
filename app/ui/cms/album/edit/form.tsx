'use client'
import { editAlbum } from '@/app/lib/api/cms/album/editAlbum'
import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { DeleteButton } from '@/app/ui/cms/album/edit/deleteButton'
import { ImageUpload } from '@/app/ui/cms/album/new/imageUpload'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import { SubmitButton } from '@/app/ui/submitButton'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'

export function Form({
	circles,
	data,
}: {
	circles: Awaited<ReturnType<typeof fetchCircles>>
	data: Awaited<ReturnType<typeof fetchAlbum>>
}) {
	const [state, dispatch] = useFormState(editAlbum, {
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
		<>
			<Toaster />
			<form action={dispatch} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<input type="hidden" name="id" id="id" defaultValue={data.id} />
				<div className="flex flex-col gap-4">
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
					<InputField
						label="Release Year"
						id="releaseYear"
						name="releaseYear"
						type="year"
						errorArray={state.errors?.releaseYear}
						defaultValue={data.releaseYear.toString()}
					/>
					<InputField
						label="Total Track"
						id="totalTrack"
						name="totalTrack"
						type="tel"
						maxLength={2}
						errorArray={state.errors?.totalTrack}
						defaultValue={data.totalTrack.toString()}
					/>
					<SelectField
						id="circleId"
						name="circleId"
						placeholder="Circle"
						label="Circle"
						errorArray={state.errors?.circleId}
						options={circles}
						href="actor"
						defaultValue={data.circleId}
					/>
					<div className="lg:block hidden">
						<SubmitButton />
						<DeleteButton data={data} />
					</div>
				</div>
				<div className="flex flex-col items-center w-full">
					<ImageUpload state={state} defaultValue={data.imageUrl} />
				</div>
				<div className="lg:hidden block mb-4">
					<SubmitButton />
					<DeleteButton data={data} />
				</div>
			</form>
		</>
	)
}