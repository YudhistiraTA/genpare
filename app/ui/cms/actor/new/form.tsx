'use client'
import { createActor } from '@/app/lib/api/cms/actor/createActor'
import { debounceHTML } from '@/app/lib/debounce'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import { SlugField } from '@/app/ui/cms/slugField'
import { SubmitButton } from '@/app/ui/submitButton'
import { Role } from '@prisma/client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'

export function Form() {
	const [slugValue, setSlug] = useState('')
	const [customSlug, setCustomSlug] = useState(false)
	const [state, dispatch] = useFormState(createActor, {
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
		<form action={dispatch} className="grid grid-cols-1 gap-4">
			<Toaster />
			<InputField
				label="Name"
				id="name"
				ref={nameRef}
				name="name"
				errorArray={state.errors?.name}
				onChange={updateSlug}
			/>
			<SlugField
				customSlug={customSlug}
				setCustomSlug={setCustomSlug}
				slugValue={slugValue}
				errorArray={state.errors?.slug}
				setSlug={setSlug}
			/>
			<SelectField
				id="role"
				name="role"
				label="Role"
				errorArray={state.errors?.role}
				options={Object.values(Role).map((role) => ({ id: role, name: role }))}
			/>
			<SubmitButton />
		</form>
	)
}
