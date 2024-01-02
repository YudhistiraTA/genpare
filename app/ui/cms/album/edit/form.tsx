'use client'
import { editAlbum } from '@/app/lib/api/cms/album/editAlbum'
import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { DeleteButton } from '@/app/ui/cms/album/edit/deleteButton'
import { ImageUpload } from '@/app/ui/cms/album/new/imageUpload'
import { InputField } from '@/app/ui/cms/inputField'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
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
					<div className="flex flex-col">
						<label htmlFor="circle">Circle</label>
						<select
							id="circleId"
							name="circleId"
							placeholder="circle"
							className="select select-bordered w-full"
							defaultValue={data.circleId || ''}
							aria-describedby="circle-error"
						>
							<option value="" disabled>
								Circle
							</option>
							{circles.map(({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
						</select>
						<Link
							href="/cms/actor/new"
							className="text-xs underline text-blue-400"
						>
							Need to add a new circle?
						</Link>
						<div id="circle-error" aria-live="polite" aria-atomic="true">
							{state.errors?.circleId &&
								state.errors?.circleId.map((error: string) => (
									<p className="mt-2 text-sm text-red-500" key={error}>
										{error}
									</p>
								))}
						</div>
					</div>
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
