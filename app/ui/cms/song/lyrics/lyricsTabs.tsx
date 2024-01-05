'use client'
import { fetchActors } from '@/app/lib/api/cms/lyrics/fetchActors'
import { fetchLyrics } from '@/app/lib/api/cms/lyrics/fetchLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { Form } from '@/app/ui/cms/song/lyrics/form'
import { Language } from '@prisma/client'
import { Fragment, useRef, useState } from 'react'

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
	const [tabs, setTabs] = useState<Tab[]>(
		data.Lyrics.length ? data.Lyrics : [{ language: 'japanese' }],
	)
	const [selectedTab, setSelectedTab] = useState<number>(0)
	const originRef = useRef<HTMLInputElement | null>(null)
	return (
		<div className="flex flex-col gap-4 mt-4">
			<p className='text-2xl'>{data.name} Lyrics and Translations</p>
			<strong className='border-l-2 border-error pl-2'>Submit one language at a time!</strong>
			<div role="tablist" className="tabs tabs-lifted tabs-lg">
				{tabs.map((lyrics, i) => (
					<Fragment key={lyrics?.id ?? i}>
						<input
							type="radio"
							ref={i === 0 ? originRef : undefined}
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
								songSlug={data.slug}
								songName={data.name}
								originRef={originRef}
							/>
						</div>
					</Fragment>
				))}
				{tabs.length < Object.values(Language).length && data.Lyrics.length ? (
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
