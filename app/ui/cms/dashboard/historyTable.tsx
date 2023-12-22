import { fetchHistory } from '@/app/lib/api/cms/dashboard/history'
import { PaginationButton } from '@/app/ui/cms/dashboard/paginationButton'

export async function HistoryTable({ page }: { page: number }) {
	const { result, total } = await fetchHistory(page)
	return (
		<table className="table table-lg">
			<thead>
				<tr>
					<th>Time</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{result.map((item) => (
					<tr key={item.id}>
						<td>{new Date(item.createdAt).toLocaleString()}</td>
						<td>{item.message}</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={2} className="flex place-items-center gap-2">
						<PaginationButton type="prev" disabled={page === 1} />
						<div>
							Page {page} out of {Math.ceil(total / 10)}
						</div>
						<PaginationButton
							type="next"
							disabled={page >= Math.ceil(total / 10)}
						/>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}
