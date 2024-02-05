'use client'
import React, { useMemo, useEffect, useState, memo } from 'react'

const LyricsComponent = memo(
	({ main, sub }: { main?: string; sub?: string }) => {
		const [error, setError] = useState(false)

		const mainArray = useMemo(() => main?.split('\\n'), [main])
		const subArray = useMemo(() => sub?.split('\\n'), [sub])

		useEffect(() => {
			if (mainArray?.length !== subArray?.length) {
				setError(true)
			} else {
				setError(false)
			}
		}, [mainArray, subArray])

		if (error || !mainArray || !subArray) return <p>Invalid input or format</p>

		return mainArray.map((line, index) => {
			if (!line) return <br className="my-2" key={`lyrics line ${index}`} />
			return (
				<ruby
					key={`lyrics line ${index}`}
					className="lg:text-xl text-left flex flex-wrap flex-col px-1 whitespace-pre-wrap"
				>
					<rt className="text-xs text-left whitespace-pre-wrap lg:text-sm opacity-70">
						{subArray[index]}
					</rt>
					{line}
				</ruby>
			)
		})
	},
)

LyricsComponent.displayName = 'Lyrics'
export const Lyrics = memo(LyricsComponent)
