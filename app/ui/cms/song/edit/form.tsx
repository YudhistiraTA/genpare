'use client'
import { createSong } from '@/app/lib/api/cms/song/createSong'
import { fetchSong } from '@/app/lib/api/cms/song/fetchSong'
import { fetchFormOptions } from '@/app/lib/api/cms/song/formOptions'
import { youtubeIdExtract } from '@/app/lib/youtubeIdExtract'
import { InputField } from '@/app/ui/cms/inputField'
import { SelectField } from '@/app/ui/cms/selectField'
import YouTubePlayer from '@/app/ui/main/youtube'
import { SubmitButton } from '@/app/ui/submitButton'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'

export function Form({
	options,
	data,
}: {
	options: Awaited<ReturnType<typeof fetchFormOptions>>
	data: Awaited<ReturnType<typeof fetchSong>>
}) {
	const [youtubeId, setYoutubeId] = useState(data.youtubeId)
	const [state, dispatch] = useFormState(createSong, {
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
					<SelectField
						label="Album"
						id="albumId"
						name="albumId"
						errorArray={state.errors?.albumId}
						options={options.albums}
						href="album"
            defaultValue={data.albumId}
					/>
					<InputField
						id="trackNo"
						name="trackNo"
						label="Track No."
						type="tel"
						errorArray={state.errors?.trackNo}
						maxLength={2}
            defaultValue={data.trackNo.toString()}
					/>
					<InputField
						label="Youtube Link"
						id="youtubeId"
						name="youtubeId"
						onChange={({ target: { value } }) =>
							setYoutubeId(youtubeIdExtract(value))
						}
						errorArray={state.errors?.youtubeId}
            defaultValue={data.youtubeId}
					/>
					<SelectField
						label="Vocalists"
						id="vocalists"
						name="vocalists"
						errorArray={state.errors?.Vocals}
						options={options.vocals}
						href="actor"
						isMulti
            defaultValue={data.Vocals}
					/>
					<SelectField
						label="Composers"
						id="composers"
						name="composers"
						errorArray={state.errors?.Composer}
						options={options.composers}
						href="actor"
						isMulti
            defaultValue={data.Composer}
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
