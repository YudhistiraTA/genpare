'use client'
import { fetchLyrics } from '@/app/lib/api/cms/lyrics/fetchLyrics'
import { submitLyrics } from '@/app/lib/api/cms/lyrics/submitLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { SelectField } from '@/app/ui/cms/selectField'
import { Language } from '@prisma/client'
import { useFormState } from 'react-dom'

export function Form({
	lyrics,
	unavailableLanguages,
}: {
	lyrics?: Awaited<ReturnType<typeof fetchLyrics>>['Lyrics'][number]
	unavailableLanguages?: Language[]
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
			/>
		</form>
	)
}
