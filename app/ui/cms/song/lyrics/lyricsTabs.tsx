'use client'
import { fetchLyrics } from '@/app/lib/api/cms/lyrics/fetchLyrics'
import { capitalize } from '@/app/lib/capitalize'
import { useState } from 'react'

export function LyricsTabs({
	data,
}: {
	data: Awaited<ReturnType<typeof fetchLyrics>>
}) {
	const [tabs, setTabs] = useState<Partial<typeof data.Lyrics>>(data.Lyrics)
	const [selectedTab, setSelectedTab] = useState<number>(0)
	return (
		<div className='flex flex-col gap-4 mt-4'>
			<strong>{data.name} Lyrics and Translations</strong>
			<div role="tablist" className="tabs tabs-lifted">
				{tabs.map((data, i) => (
					<>
						<input
							type="radio"
							name="my_tabs_2"
							role="tab"
							className="tab"
							aria-label={capitalize(data?.language || 'New Language')}
							defaultChecked={i === selectedTab}
						/>
						<div
							role="tabpanel"
							className="tab-content bg-base-100 border-base-300 rounded-box p-6"
						>
							{data?.content.split('\\n').map((line, index) => (
								<p key={data.language + index}>{line}</p>
							))}
						</div>
					</>
				))}
				<div
					role="tab"
					className="tab"
					onClick={() => {
						setTabs((p) => {
							const newArr = [...p]
							newArr.push(undefined)
							setSelectedTab(newArr.length - 1)
							return newArr
						})
					}}
				>
					Add new language
				</div>
			</div>
		</div>
	)
}
