import { fetchLanguageStats } from '@/app/lib/api/cms/dashboard/languageStats'
import { capitalize } from '@/app/lib/capitalize'
import Link from 'next/link'

export async function LanguageStats() {
	const counts = await fetchLanguageStats()
	return (
		<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
			{counts
				.filter(({ language }) => language !== 'japanese')
				.map(({ language, count }) => (
					<Link
						href={`/cms/song?untranslated=${language}`}
						className="stat hover:bg-[#343B45]"
						key={language}
					>
						<div className="stat-title">
							Songs without {capitalize(language)}{' '}
							{language !== 'romaji' && 'translation'}
						</div>
						<div className="stat-value">{Number(count)}</div>
					</Link>
				))}
		</div>
	)
}
