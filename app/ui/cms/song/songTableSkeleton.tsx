export function SongTableSkeleton() {
	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					<td>Name</td>
					<td>Translations</td>
					<td>Slug</td>
					<td>Youtube ID</td>
					<td>Album</td>
					<td>Track No.</td>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 10 }).map((_, index) => (
					<tr key={`skeleton-entry-${index}`}>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
						<td>
							<div className="skeleton h-4 w-28"></div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
