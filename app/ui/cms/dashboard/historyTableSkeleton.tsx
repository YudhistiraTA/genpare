export function HistoryTableSkeleton() {
	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					<td>Time</td>
					<td>Action</td>
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
					</tr>
				))}
			</tbody>
		</table>
	)
}
