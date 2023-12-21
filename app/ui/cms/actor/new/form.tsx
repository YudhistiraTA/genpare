'use client'
import { createActor } from '@/app/lib/api/cms/actor/createActor'
import { debounceHTML } from '@/app/lib/debounce'
import { Role } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import slug from 'slug'

export function Form() {
	const [slugValue, setSlug] = useState('')
	const [customSlug, setCustomSlug] = useState(false)
	const [state, dispatch] = useFormState(createActor, {
		errors: {},
		message: '',
	})
	const updateSlug = debounceHTML(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			if (customSlug) return
			const { value } = e.target
			const { toRomaji } = await import('@/app/lib/kuroshiro')
			const romaji = await toRomaji(value)
			setSlug(slug(romaji, { lower: true }))
		},
		500,
	)

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
			<div className="flex flex-col">
				<label htmlFor="name">Name</label>
				<input
					ref={nameRef}
					className="input input-bordered"
					id="name"
					name="name"
					type="text"
					onChange={updateSlug}
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="slug">
					<div
						className="tooltip tooltip-right"
						data-tip='Please ensure all characters are latin lowercase and spaces are written with "-"'
					>
						<div className="flex gap-4">
							<label htmlFor="slug-toggle">Custom Slug</label>
							<input
								id="slug-toggle"
								type="checkbox"
								checked={customSlug}
								onChange={({ target: { checked } }) => {
									setCustomSlug(checked)
								}}
							></input>
						</div>
					</div>
					<p>Slug</p>
				</label>
				<input
					className="input input-bordered"
					id="slug"
					name="slug"
					type="text"
					disabled={!customSlug}
					value={slugValue}
					onChange={({ target: { value } }) => {
						if (customSlug) setSlug(value)
					}}
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="role">Role</label>
				<select
					id="role"
					name="role"
					placeholder="Role"
					className="select select-bordered w-full"
					defaultValue=""
				>
					<option value="">Role</option>
					{Object.values(Role).map((role, index) => (
						<option key={index} value={role}>
							{role}
						</option>
					))}
				</select>
			</div>
		</form>
	)
}
