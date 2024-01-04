'use client'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export type Option = {
	id: string
	name: string
	slug?: string
	disabled?: boolean
}[]

export type SelectedOption = {
	value: string
	label: string
	slug?: string
	disabled?: boolean
}

export function SelectField({
	options,
	errorArray,
	id,
	label,
	name,
	placeholder = '',
	defaultValue,
	href,
	isMulti = false,
	onChange,
	disabled,
}: {
	options: Option
	id: string
	name: string
	label: string
	placeholder?: string
	errorArray?: string[]
	defaultValue?: string | Option | null
	href?: string
	isMulti?: boolean
	onChange?: (selected: SelectedOption) => void
	disabled?: boolean
}) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	const instanceId = useId()
	if (!mounted) return null
	const convertedOptions = options.map(({ id, name, slug, disabled }) => ({
		value: id,
		label: name,
		slug: slug,
		isDisabled: disabled,
	}))
	return (
		<div className="flex flex-col">
			<label htmlFor={id}>{label}</label>
			<Select
				components={makeAnimated()}
				id={id}
				instanceId={instanceId}
				name={name}
				placeholder={placeholder}
				isDisabled={disabled}
				defaultValue={
					defaultValue
						? isMulti
							? convertedOptions.filter((option) =>
									(defaultValue as { id: string }[]).find(
										({ id }) => id === option.value,
									),
							  )
							: convertedOptions.find((option) => option.value === defaultValue)
						: undefined
				}
				styles={{
					control: (base, state) => ({
						...base,
						borderRadius: 'var(--rounded-btn, 0.5rem)',
						padding: '0 0.4rem 0 0.4rem',
						lineHeight: '1.5rem',
						fontSize: '1rem',
						minHeight: '3rem',
						cursor: state.isDisabled ? 'not-allowed' : 'pointer',
						pointerEvents: 'auto',
						background: state.isDisabled
							? '#191E24'
							: 'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
						borderColor: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
						backgroundImage:
							'var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))',
						'&:hover': {
							borderColor: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
						},
						boxShadow: 'none',
					}),
					multiValue: (base) => ({
						...base,
						backgroundColor: 'rgb(39, 47, 56)',
					}),
					multiValueLabel: (base) => ({ ...base, color: 'inherit' }),
					multiValueRemove: (base) => ({
						...base,
						'&:hover': { backgroundColor: 'rgb(52, 59, 69)', color: 'inherit' },
					}),
					singleValue: (base) => ({ ...base, color: 'inherit' }),
					dropdownIndicator: (base, state) => ({
						...base,
						color: 'inherit',
						'&hover': { color: state.isFocused ? 'inherit' : 'inherit' },
					}),
					indicatorSeparator: (base) => ({ ...base, visibility: 'hidden' }),
					menu: (base) => ({
						...base,
						color: 'inherit',
						background: 'rgb(39, 47, 56)',
					}),
					option: (base, state) => ({
						...base,
						backgroundColor: state.isFocused ? 'rgb(52, 59, 69)' : 'inherit',
						color: state.isDisabled ? 'rgb(128 128 128)' : 'inherit',
						cursor: state.isDisabled ? 'not-allowed' : 'pointer',
						'&:active': {
							backgroundColor: 'inherit',
						},
					}),
					input: (base) => ({ ...base, color: 'inherit' }),
				}}
				aria-describedby={`${id}-error`}
				options={convertedOptions}
				filterOption={(option, rawInput) => {
					const input = rawInput.toLowerCase()
					const {
						label,
						data: { slug },
					} = option
					return (
						label.toLowerCase().includes(input) ||
						!!(slug && slug.toLowerCase().includes(input))
					)
				}}
				isMulti={isMulti}
				closeMenuOnSelect={!isMulti}
				onChange={(e) => {
					if (onChange && e && !Array.isArray(e)) {
						const val = e as SelectedOption
						onChange(val)
					}
				}}
			/>
			{href ? (
				<Link
					href={`/cms/${href}/new`}
					className="text-xs underline text-blue-400 w-fit"
				>
					Need to add a new {label.toLowerCase()}?
				</Link>
			) : null}
			<div id={`${id}-error`} aria-live="polite" aria-atomic="true">
				{errorArray &&
					errorArray.map((error: string) => (
						<p className="mt-2 text-sm text-red-500" key={error}>
							{error}
						</p>
					))}
			</div>
		</div>
	)
}
