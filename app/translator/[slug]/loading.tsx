import { CardSkeleton } from '@/app/ui/cardSkeleton'

export default function Loading() {
	return (
		<main className="flex flex-col items-center">
			<div className="skeleton w-64 h-10"></div>
			<div className="lg:grid-cols-2 grid gap-4 my-4">
				{[...Array(4)].map((_, i) => (
					<CardSkeleton key={`card skeleton ${i}`} />
				))}
			</div>
		</main>
	)
}
