'use client'
import { fetchActors } from '@/app/lib/api/cms/lyrics/fetchActors'
import { fetchLyrics } from '@/app/lib/api/cms/lyrics/fetchLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { Form } from '@/app/ui/cms/song/lyrics/form'
import { Language } from '@prisma/client'
import { Fragment, useState } from 'react'

type LyricsType = NonNullable<
	Awaited<ReturnType<typeof fetchLyrics>>
>['Lyrics'][number]
export type Tab = Partial<LyricsType>

export function LyricsTabs({
	data,
	actors,
}: {
	data: Awaited<ReturnType<typeof fetchLyrics>>
	actors: Awaited<ReturnType<typeof fetchActors>>
}) {
	const [tabs, setTabs] = useState<Tab[]>(data.Lyrics)
	const [selectedTab, setSelectedTab] = useState<number>(0)
	return (
		<div className="flex flex-col gap-4 mt-4">
			<strong>{data.name} Lyrics and Translations</strong>
			<p
				className="p-4 rounded-xl w-fit"
				style={{ boxShadow: '0 0 10px salmon' }}
			>
				Submit one language at a time!
			</p>
			<div role="tablist" className="tabs tabs-lifted tabs-lg">
				{tabs.map((lyrics, i) => (
					<Fragment key={lyrics?.id ?? i}>
						<input
							type="radio"
							name="my_tabs_2"
							role="tab"
							className="tab [--tab-border-color:#343B45]"
							aria-label={capitalize(lyrics?.language || 'New Language')}
							defaultChecked={i === selectedTab}
						/>
						<div
							role="tabpanel"
							className="tab-content rounded-box p-6 border-neutral"
						>
							<Form
								lyrics={lyrics}
								unavailableLanguages={
									tabs.map((tab) => tab.language).filter(Boolean) as Language[]
								}
								index={i}
								tabs={tabs}
								setTabs={setTabs}
								actors={actors}
								songId={data.id}
							/>
						</div>
					</Fragment>
				))}
				{tabs.length < Object.values(Language).length ? (
					<div
						role="tab"
						className="tab [--tab-border-color:#343B45]"
						onClick={() => {
							setTabs((p) => {
								const newArr = [...p]
								newArr.push({
									content: undefined,
									id: undefined,
									language: undefined,
								})
								setSelectedTab(newArr.length - 1)
								return newArr
							})
						}}
					>
						Add new language
					</div>
				) : null}
			</div>
		</div>
	)
}
