import { CardSkeleton } from '@/app/ui/cardSkeleton'

export default function Loading() {
	return (
		<main className="flex flex-col items-center">
			<div className="skeleton w-64 h-10"></div>
			<section className="flex flex-col items-center justify-between px-2 lg:px-24">
				<div className="lg:flex grid lg:gap-8 gap-4 my-4 lg:flex-wrap">
					{[...Array(6)].map((_, i) => (
						<CardSkeleton key={`card skeleton ${i}`} />
					))}
				</div>
			</section>
		</main>
	)
}
