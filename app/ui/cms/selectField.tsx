import Link from 'next/link'

export function SelectField({
	options,
	errorArray,
	id,
	label,
	name,
	placeholder,
	defaultValue,
	href,
}: {
	options: { id: string; name: string }[]
	id: string
	name: string
	label: string
	placeholder: string
	errorArray?: string[]
	defaultValue?: string | null
	href?: string
}) {
	return (
		<div className="flex flex-col">
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				name={name}
				placeholder={placeholder}
				className="select select-bordered w-full"
				defaultValue={defaultValue || ''}
				aria-describedby={`${id}-error`}
			>
				<option value="" disabled>
					{placeholder}
				</option>
				{options.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
			{href ? (
				<Link
					href={`/cms/${href}/new`}
					className="text-xs underline text-blue-400"
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
