'use client'
import { createSong } from '@/app/lib/api/cms/song/createSong'
import { fetchFormOptions } from '@/app/lib/api/cms/song/formOptions'
import { debounceHTML } from '@/app/lib/debounce'
import { youtubeIdExtract } from '@/app/lib/youtubeIdExtract'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import { SlugField } from '@/app/ui/cms/slugField'
import YouTubePlayer from '@/app/ui/main/youtube'
import { SubmitButton } from '@/app/ui/submitButton'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'

export function Form({
	options,
}: {
	options: Awaited<ReturnType<typeof fetchFormOptions>>
}) {
	const [slugValue, setSlug] = useState('')
	const [customSlug, setCustomSlug] = useState(false)
	const [youtubeId, setYoutubeId] = useState('')
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
		<>
			<Toaster />
			<form action={dispatch} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4">
					<InputField
						label="Name"
						id="name"
						ref={nameRef}
						name="name"
						onChange={updateSlug}
						errorArray={state.errors?.name}
					/>
					<SlugField
						customSlug={customSlug}
						slugValue={slugValue}
						setCustomSlug={setCustomSlug}
						setSlug={setSlug}
						errorArray={state.errors?.slug}
					/>
					<SelectField
						label="Album"
						id="albumId"
						name="albumId"
						errorArray={state.errors?.albumId}
						options={options.albums}
						href="album"
					/>
					<InputField
						id="trackNo"
						name="trackNo"
						label="Track No."
						type="tel"
						errorArray={state.errors?.trackNo}
						maxLength={2}
					/>
					<InputField
						label="Youtube Link"
						id="youtubeId"
						name="youtubeId"
						onChange={({ target: { value } }) =>
							setYoutubeId(youtubeIdExtract(value))
						}
						errorArray={state.errors?.youtubeId}
					/>
					<SelectField
						label="Vocalists"
						id="vocalists"
						name="vocalists"
						errorArray={state.errors?.Vocals}
						options={options.vocals}
						href="actor"
						isMulti
					/>
					<SelectField
						label="Composers"
						id="composers"
						name="composers"
						errorArray={state.errors?.Composer}
						options={options.composers}
						href="actor"
						isMulti
					/>
					<SubmitButton />
				</div>
				<div className="hidden lg:flex flex-col justify-center place-items-center">
					<label htmlFor="youtubeId">Youtube Link Preview</label>
					{youtubeId ? (
						<YouTubePlayer
							title="yt-preview"
							videoId={youtubeId}
							className="w-96"
						/>
					) : (
						<label htmlFor="youtubeId" className="hover:cursor-pointer">
							<div className="w-96 rounded-xl h-52 border border-default mt-2 flex justify-center items-center">
								Please fill the Youtube Link field
							</div>
						</label>
					)}
				</div>
			</form>
		</>
	)
}
