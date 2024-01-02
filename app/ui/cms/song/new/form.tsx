'use client'
import { createSong } from '@/app/lib/api/cms/song/createSong'
import { debounceHTML } from '@/app/lib/debounce'
import { InputField } from '@/app/ui/cms/inputField'
import { SlugField } from '@/app/ui/cms/slugField'
import { SubmitButton } from '@/app/ui/submitButton'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'

export function Form() {
	const [slugValue, setSlug] = useState('')
	const [customSlug, setCustomSlug] = useState(false)
	const [state, dispatch] = useFormState(createSong, {
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
				onChange={updateSlug}
			/>
			<SlugField
				customSlug={customSlug}
				slugValue={slugValue}
				setCustomSlug={setCustomSlug}
				setSlug={setSlug}
			/>
			<SubmitButton />
		</form>
	)
}