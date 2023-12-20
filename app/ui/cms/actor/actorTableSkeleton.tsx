export function ActorTableSkeleton() {
	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					<td>Name</td>
					<td>Slug</td>
					<td>Role</td>
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
					</tr>
				))}
			</tbody>
		</table>
	)
}
