import { getAlbum } from '@/app/lib/api/album'
import { Card } from '@/app/ui/card'
import { CardSkeleton } from '@/app/ui/cardSkeleton'
import { MainPageCardWrapper } from '@/app/ui/mainPageCardWrapper'
import Searchbar from '@/app/ui/searchbar'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page({
	searchParams: { query },
}: {
	searchParams: { query: string }
}) {
	const albums = await getAlbum(query)
	return (
		<main className="flex flex-col items-center justify-between px-2 lg:px-24">
			<Searchbar className="w-full" placeholder="Search..." />
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
