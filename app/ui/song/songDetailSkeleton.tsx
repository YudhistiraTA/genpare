import clsx from 'clsx'

export function SongDetailSkeleton({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'card glass lg:shadow-xl',
				className,
			)}
		>
			<figure className="mt-4">
				<div className="skeleton w-full mx-4 h-48"></div>
			</figure>
			<div className="card-body flex flex-col gap-3 mb-4">
				<div className="skeleton w-52 h-6"></div>
				<div className="skeleton w-64 h-6"></div>
				<div className="skeleton w-44 h-6"></div>
				<div className="skeleton w-56 h-6"></div>
				<div className="skeleton w-40 h-6"></div>
			</div>
		</div>
	)
}
