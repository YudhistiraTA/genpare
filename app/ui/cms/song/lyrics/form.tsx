'use client'
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
}: {
	lyrics?: Tab
	unavailableLanguages?: Language[]
	index: number
	setTabs: Dispatch<SetStateAction<Tab[]>>
}) {
	const [state, dispatch] = useFormState(submitLyrics, {
		errors: {},
		message: '',
	})
	return (
		<form action={dispatch}>
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
		</form>
	)
}
