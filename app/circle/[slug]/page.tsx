import { getCircle } from '@/app/lib/api/actors'
import { capitalizeAll } from '@/app/lib/capitalizeAll'
import { Card } from '@/app/ui/card'
import { CardSkeleton } from '@/app/ui/cardSkeleton'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [circle] = await getCircle(slug)
	const prevMeta = await parent
	return {
		title: circle.name,
		description: `Discography with ${circle.name} as circle`,
		keywords: [...(prevMeta.keywords ?? []), 'Circle', circle.name],
		alternates: {
			canonical: `https://www.gengo-parade.com/circle/${circle.slug}`,
		},
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [circle, albums] = await getCircle(slug)
	return (
		<main className="flex flex-col items-center">
			<h1 className="font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight text-3xl px-6 py-2 rounded-xl">
				{capitalizeAll(circle.name)}
			</h1>
			<section className="flex flex-col items-center justify-between px-2 lg:px-24">
				<div className="lg:flex grid lg:gap-8 gap-4 my-4">
					<Suspense
						fallback={
							<section className="lg:flex grid lg:gap-8 gap-4 my-4 flex-wrap justify-center">
								{[...Array(6)].map((_, i) => (
									<CardSkeleton key={`card skeleton ${i}`} />
								))}
							</section>
						}
					>
						<section className="lg:flex grid lg:gap-8 gap-4 my-4 justify-center">
							{albums.map((album) => (
								<Link
									key={album.id}
									href={`/album/${album.slug}`}
									className="hover:scale-105 transition-transform"
								>
									<Card
										imageUrl={album.imageUrl}
										title={album.name}
										body={album.releaseYear.toString()}
									/>
								</Link>
							))}
						</section>
					</Suspense>
				</div>
			</section>
		</main>
	)
}
