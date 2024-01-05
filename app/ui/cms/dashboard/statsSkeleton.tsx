export function StatsSkeleton({
	numberOfStats = 5,
}: {
	numberOfStats?: number
}) {
	return (
		<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
			{Array.from({ length: numberOfStats }, (_, index) => (
				<div className="stat" key={index}>
					<div className="stat-title skeleton h-6 mb-2 w-40"></div>
					<div className="stat-value skeleton h-12 mb-2 w-20"></div>
				</div>
			))}
		</div>
	)
}
