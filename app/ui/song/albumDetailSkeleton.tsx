import clsx from 'clsx'

export function AlbumDetailSkeleton({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'card glass lg:fixed lg:top-28 md:w-72 lg:right-28 lg:w-96 lg:shadow-xl',
				className,
			)}
		>
			<figure className="mt-4">
				<div className="skeleton w-48 h-48"></div>
			</figure>
			<div className="card-body flex flex-col gap-3 mb-4">
				<div className='skeleton w-52 h-6'></div>
				<div className='skeleton w-64 h-6'></div>
				<div className='skeleton w-44 h-6'></div>
			</div>
			<ul className="menu -mt-10 ml-2">
				<li>
					<div className="skeleton w-28 h-6 mb-2"></div>
					<ul>
						<li>
							<div className="skeleton w-64 h-6 mb-2"></div>
							<div className="skeleton w-32 h-6 mb-2"></div>
						</li>
						<li>
							<div className="skeleton w-64 h-6 mb-2"></div>
							<div className="skeleton w-32 h-6 mb-2"></div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}
