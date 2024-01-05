'use client'
import { fetchActors } from '@/app/lib/api/cms/lyrics/fetchActors'
import {
	deleteLyrics,
	submitLyrics,
} from '@/app/lib/api/cms/lyrics/submitLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { SelectField } from '@/app/ui/cms/selectField'
import { Tab } from '@/app/ui/cms/song/lyrics/lyricsTabs'
import { SubmitButton } from '@/app/ui/submitButton'
import { Language } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export function Form({
	lyrics,
	unavailableLanguages,
	index,
	setTabs,
	songId,
	tabs,
	actors,
	songSlug,
	songName,
	originRef,
}: {
	lyrics?: Tab
	unavailableLanguages?: Language[]
	index: number
	setTabs: Dispatch<SetStateAction<Tab[]>>
	tabs: Tab[]
	actors: Awaited<ReturnType<typeof fetchActors>>
	songId: string
	songSlug: string
	songName: string
	originRef?: React.MutableRefObject<HTMLInputElement | null>
}) {
	const [state, dispatch] = useFormState(submitLyrics, {
		errors: {},
		message: '',
	})
	const [creatorKey, setCreatorKey] = useState(0)
	const currentLanguage = tabs[index].language
	useEffect(() => {
		setCreatorKey(() => Math.random())
	}, [currentLanguage])
	return (
		<form action={dispatch} className="flex flex-col gap-4">
			{state?.message ? (
				<p className="p-2 rounded-xl w-fit bg-error text-error-content">
					{state.message}
				</p>
			) : null}
			<input type="hidden" id="songId" name="songId" defaultValue={songId} />
			<input type="hidden" id="slug" name="slug" defaultValue={songSlug} />
			<input
				type="hidden"
				id="songName"
				name="songName"
				defaultValue={songName}
			/>
			<SelectField
				label="Language"
				id="language"
				name="language"
				disabled={lyrics?.language === 'japanese' && index === 0}
				dataTip={
					lyrics?.language === 'japanese' && index === 0
						? 'First language submitted must be Japanese'
						: undefined
				}
				errorArray={state?.errors?.language}
				defaultValue={lyrics?.language}
				options={Object.values(Language).map((language) => ({
					id: language,
					name: capitalize(language),
					disabled: unavailableLanguages?.includes(language),
				}))}
				onChange={(e) => {
					setTabs((p) => {
						const newArr = [...p]
						newArr[index].language = e.value as Language
						return newArr
					})
				}}
			/>
			<SelectField
				key={creatorKey}
				label={
					currentLanguage === 'japanese' || currentLanguage === 'romaji'
						? 'Lyricist'
						: 'Translator'
				}
				id="creatorId"
				name="creatorId"
				errorArray={state?.errors?.creatorId}
				defaultValue={
					currentLanguage === 'romaji'
						? tabs.find((tab) => tab.language === 'japanese')?.creatorId
						: lyrics?.creatorId
				}
				placeholder={
					currentLanguage === 'romaji' &&
					!tabs.find((tab) => tab.language === 'japanese')?.creatorId
						? 'Submit a Japanese lyricist to fill this field'
						: ''
				}
				disabled={currentLanguage === 'romaji'}
				options={
					currentLanguage === 'japanese' || currentLanguage === 'romaji'
						? actors.lyricists
						: actors.translators
				}
			/>
			<div className="flex flex-col">
				<label htmlFor="content">
					{currentLanguage === 'japanese' || currentLanguage === 'romaji'
						? 'Lyrics'
						: 'Translation'}
				</label>
				<textarea
					className="textarea textarea-bordered w-full h-96"
					id="content"
					name="content"
					aria-describedby="content-error"
					defaultValue={lyrics?.content?.replace(/\\n/g, '\n')}
				/>
				<div id="content-error" aria-live="polite" aria-atomic="true">
					{state?.errors?.content &&
						state?.errors?.content.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
				</div>
			</div>
			{lyrics?.id && currentLanguage === 'japanese' ? (
				<strong className='border-l-2 border-error pl-2'>
					Be sure to update the other languages if you have modified the number
					of lines in the Japanese lyrics!
				</strong>
			) : null}
			<div className="flex gap-4">
				<SubmitButton />
				<button
					type="button"
					disabled={currentLanguage === 'japanese'}
					className="btn btn-error text-error-content"
					onClick={async () => {
						if (lyrics?.id) {
							await deleteLyrics(
								lyrics.id,
								lyrics.language as Language,
								songName,
							)
						}
						setTabs((p) => p.filter((_, i) => i !== index))
						if (originRef?.current) originRef.current.checked = true
					}}
				>
					Delete
				</button>
			</div>
		</form>
	)
}
