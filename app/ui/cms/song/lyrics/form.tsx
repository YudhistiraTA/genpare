'use client'
import { fetchActors } from '@/app/lib/api/cms/lyrics/fetchActors'
import { submitLyrics } from '@/app/lib/api/cms/lyrics/submitLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { SelectField } from '@/app/ui/cms/selectField'
import { Tab } from '@/app/ui/cms/song/lyrics/lyricsTabs'
import { Language } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'
import { useFormState } from 'react-dom'

export function Form({
	lyrics,
	unavailableLanguages,
	index,
	setTabs,
	songId,
	tabs,
	actors,
}: {
	lyrics?: Tab
	unavailableLanguages?: Language[]
	index: number
	setTabs: Dispatch<SetStateAction<Tab[]>>
	tabs: Tab[]
	actors: Awaited<ReturnType<typeof fetchActors>>
	songId: string
}) {
	const [state, dispatch] = useFormState(submitLyrics, {
		errors: {},
		message: '',
	})
	return (
		<form action={dispatch} className='flex flex-col gap-4'>
			<input type="hidden" id="songId" name="songId" defaultValue={songId} />
			<SelectField
				label="Language"
				id="language"
				name="language"
				errorArray={state.errors?.language}
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
				label={
					tabs[index].language === 'japanese' ||
					tabs[index].language === 'romaji'
						? 'Lyricist'
						: 'Translator'
				}
				id="creatorId"
				name="creatorId"
				errorArray={state.errors?.creatorId}
				defaultValue={
					tabs[index].language === 'romaji'
						? tabs.find((tab) => tab.language === 'japanese')?.creatorId
						: lyrics?.creatorId
				}
				placeholder={
					tabs[index].language === 'romaji' &&
					!tabs.find((tab) => tab.language === 'japanese')?.creatorId
						? 'Submit a Japanese lyricist to fill this field'
						: ''
				}
				disabled={tabs[index].language === 'romaji'}
				options={
					tabs[index].language === 'japanese' ||
					tabs[index].language === 'romaji'
						? actors.lyricists
						: actors.translators
				}
			/>
		</form>
	)
}
