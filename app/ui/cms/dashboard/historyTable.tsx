import { fetchHistory } from '@/app/lib/api/cms/dashboard/history'
import { extendedDayjs } from '@/app/lib/extendedDayjs'
import { PaginationButton } from '@/app/ui/cms/dashboard/paginationButton'

export async function HistoryTable({ page }: { page: number }) {
	const { result, total } = await fetchHistory(page)
	if (result.length === 0) return <div className='p-6'>No history found</div>
	return (
		<table className="table lg:table-lg table-sm">
			<thead>
				<tr>
					<th>Action</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				{result.map((item) => (
					<tr key={item.id}>
						<td>{item.message}</td>
						<td>{extendedDayjs(item.createdAt).format('YYYY/MM/DD, hh:mm:ss z')}</td>
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
