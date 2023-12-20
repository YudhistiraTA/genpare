export function AlbumTableSkeleton() {
	return (
		<table className="table table-xs table-pin-cols">
			<thead>
				<tr>
					<td></td>
					<td>Name</td>
					<td>Slug</td>
					<td>Release Year</td>
					<td>Circle</td>
					<td>Translated Songs</td>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 10 }).map((_, index) => (
					<tr key={`skeleton-entry-${index}`}>
						<td>
							<div className="skeleton h-24 w-24"></div>
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
