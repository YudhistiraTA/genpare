import { CardSkeleton } from '@/app/ui/main/cardSkeleton'
import { MainPageCardWrapper } from '@/app/ui/main/mainPageCardWrapper'

import { Suspense } from 'react'

export default function Page({
	searchParams: { query },
}: {
	searchParams: { query: string }
}) {
	return (
		<main className="flex flex-col items-center justify-between px-2 lg:px-24">
			<Suspense
				fallback={
					<section className="lg:flex grid lg:gap-8 gap-4 my-4 flex-wrap justify-center">
						{[...Array(6)].map((_, i) => (
							<CardSkeleton key={`card skeleton ${i}`} />
						))}
					</section>
				}
			>
				<MainPageCardWrapper query={query} />
			</Suspense>
		</main>
	)
}
