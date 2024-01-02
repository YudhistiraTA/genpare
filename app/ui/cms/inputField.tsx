import clsx from 'clsx'
import React, { ForwardRefRenderFunction, HTMLInputTypeAttribute } from 'react'

type InputFieldProps = {
	label: string
	id: string
	name: string
	errorArray?: string[]
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	type?: HTMLInputTypeAttribute | 'year'
	maxLength?: number
	defaultValue?: string
}
const InputFieldPrototype: ForwardRefRenderFunction<
	HTMLInputElement,
	InputFieldProps
> = (
	{
		label,
		id,
		name,
		errorArray,
		onChange,
		type = 'text',
		maxLength,
		defaultValue,
	},
	ref,
) => {
	const numberTypes = ['number', 'tel', 'year']
	return (
		<div className="flex flex-col">
			<label htmlFor={id}>{label}</label>
			<div
				className={clsx('text-left w-full', {
					tooltip: type === 'year' || maxLength,
				})}
				data-tip={
					type === 'year'
						? `Max. ${new Date().getFullYear()}`
						: `Max. ${maxLength} digits`
				}
			>
				<input
					ref={ref || undefined}
					className="input input-bordered w-full"
					id={id}
					name={name}
					type={type === 'year' ? 'tel' : type}
					aria-describedby={`${id}-error`}
					onBeforeInput={(e) => {
						const inputEvent = e.nativeEvent as InputEvent & {
							target: { value: string }
						}
						if (
							inputEvent.data &&
							numberTypes.includes(type) &&
							!/[0-9]/.test(inputEvent.data)
						)
							return e.preventDefault()
						const inputValue = inputEvent.target.value
						if (maxLength && inputValue.length >= maxLength) {
							return e.preventDefault()
						}
						if (type === 'year') {
							if (inputValue.length >= String(new Date().getFullYear()).length)
								return e.preventDefault()
							if (
								Number(inputValue + inputEvent.data) > new Date().getFullYear()
							)
								return e.preventDefault()
						}
					}}
					onChange={(e) => {
						if (onChange) onChange(e)
					}}
					defaultValue={defaultValue}
				/>
			</div>
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

export const InputField = React.forwardRef(InputFieldPrototype)
