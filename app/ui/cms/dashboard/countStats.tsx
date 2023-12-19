import { fetchCountStats } from '@/app/lib/api/cms/dashboard/countStats'
import { capitalize } from '@/app/lib/capitalize'
import Link from 'next/link'

export async function CountStats() {
	const counts = await fetchCountStats()
	return (
		<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
			{Object.entries(counts).map(([type, amount], index) => (
				<Link
					href={
						type !== 'translator' && type !== 'circle'
							? `/cms/${type}`
							: `/cms/actor?type=${type}`
					}
					className="stat hover:bg-[#343B45]"
					key={`count-${index}`}
				>
					<div className="stat-title">Total {capitalize(type)}s</div>
					<div className="stat-value">{Number(amount)}</div>
				</Link>
			))}
		</div>
	)
}
