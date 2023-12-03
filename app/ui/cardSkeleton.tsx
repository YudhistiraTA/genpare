export function CardSkeleton() {
	return (
		<div className="card glass bg-opacity-60 lg:card-side bg-white shadow-xl">
			<figure className="p-1">
				<div className="skeleton w-60 h-60 rounded-xl"></div>
			</figure>
			<div className="card-body text-left">
				<div className="skeleton w-60 h-6"></div>
				<div className="skeleton w-32 h-6"></div>
				<div className="skeleton w-40 h-6"></div>
			</div>
		</div>
	)
}
