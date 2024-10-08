'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

export function ImageUpload({
	state,
	defaultValue,
}: {
	state: {
		errors: {
			name?: string[] | undefined
			slug?: string[] | undefined
			releaseYear?: string[] | undefined
			totalTrack?: string[] | undefined
			circleId?: string[] | undefined
			image?: string[] | undefined
		}
		message: string
	}
	defaultValue?: string
}) {
	const [imageUrl, setImageUrl] = useState<string>(defaultValue || '')
	const captureFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files === null || e.target.files.length < 1) return
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.onload = (e) => setImageUrl(e.target?.result as string)
		reader.readAsDataURL(file)
	}
	const inputRef = useRef<HTMLInputElement>(null)
	const inputFire = () => {
		inputRef.current?.click()
	}
	return (
		<>
			<div className="label" onClick={inputFire}>
				<span className="label-text text-lg">Album cover</span>
			</div>
			<div className="relative">
				{imageUrl && imageUrl !== defaultValue ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						width={40}
						height={40}
						className="absolute -right-4 -top-4 hover:cursor-pointer bg-neutral rounded-full"
						onClick={(e) => {
							e.stopPropagation()
							setImageUrl('')
							if (inputRef.current) inputRef.current.value = ''
						}}
					>
						<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
					</svg>
				) : null}
				<Image
					alt="Album Cover"
					src={imageUrl || '/300x300.png'}
					width={300}
					height={300}
					className="rounded-lg mb-4 hover:cursor-pointer"
					onClick={inputFire}
				/>
			</div>
			<input
				type="file"
				name="image"
				className="file-input file-input-bordered w-full max-w-xs"
				onChange={captureFile}
				ref={inputRef}
				aria-describedby="image-error"
			/>
			<div id="image-error" aria-live="polite" aria-atomic="true">
				{state.errors?.image &&
					state.errors?.image.map((error: string) => (
						<p className="mt-2 text-sm text-red-500" key={error}>
							{error}
						</p>
					))}
			</div>
		</>
	)
}
