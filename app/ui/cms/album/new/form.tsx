'use client'
import { createAlbum } from '@/app/lib/api/cms/album/createAlbum'
import { fetchCircles } from '@/app/lib/api/cms/album/fetchCircles'
import { debounceHTML } from '@/app/lib/debounce'
import { ImageUpload } from '@/app/ui/cms/album/new/imageUpload'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import { SlugField } from '@/app/ui/cms/slugField'
import { SubmitButton } from '@/app/ui/submitButton'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'

export function Form({
	circles,
}: {
	circles: Awaited<ReturnType<typeof fetchCircles>>
}) {
	const [slugValue, setSlug] = useState('')
	const [customSlug, setCustomSlug] = useState(false)
	const [state, dispatch] = useFormState(createAlbum, {
		errors: {},
		message: '',
	})
	const updateSlug = useMemo(
		() =>
			debounceHTML(async (e: React.ChangeEvent<HTMLInputElement>) => {
				if (customSlug) return
				const { value } = e.target
				const { toRomaji } = await import('@/app/lib/kuroshiro')
				const romaji = await toRomaji(value)
				setSlug(slug(romaji, { lower: true }))
			}, 500),
		[customSlug],
	)

	useEffect(() => {
		if (state.message) {
			toast.error(state.message, {
				style: { backgroundColor: '#272F38', color: 'white' },
			})
		}
	}, [state])

	const nameRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (!customSlug && nameRef.current && nameRef.current.value.trim() !== '') {
			updateSlug({
				target: { value: nameRef.current.value },
			} as React.ChangeEvent<HTMLInputElement>)
		}
	}, [customSlug, updateSlug])
	return (
		<>
			<Toaster />
			<form action={dispatch} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4">
					<InputField
						label="Name"
						id="name"
						name="name"
						errorArray={state.errors?.name}
						ref={nameRef}
						onChange={updateSlug}
					/>
					<SlugField
						customSlug={customSlug}
						setCustomSlug={setCustomSlug}
						slugValue={slugValue}
						errorArray={state.errors?.slug}
						setSlug={setSlug}
					/>
					<InputField
						label="Release Year"
						id="releaseYear"
						name="releaseYear"
						type="year"
						errorArray={state.errors?.releaseYear}
					/>
					<InputField
						label="Total Track"
						id="totalTrack"
						name="totalTrack"
						type="tel"
						maxLength={2}
						errorArray={state.errors?.totalTrack}
					/>
					<SelectField
						id="circleId"
						name="circleId"
						placeholder="Circle"
						label="Circle"
						errorArray={state.errors?.circleId}
						options={circles}
						href="actor"
					/>
					<div className="lg:block hidden">
						<SubmitButton />
					</div>
				</div>
				<div className="flex flex-col items-center w-full">
					<ImageUpload state={state} />
				</div>
				<div className="lg:hidden block mb-4">
					<SubmitButton />
				</div>
			</form>
		</>
	)
}
