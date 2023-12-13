'use client'

import { capitalize } from '@/app/lib/capitalize'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
	const path = usePathname()
	const crumbs = path.split('/').filter((crumb) => crumb)
	return (
		<div className="text-sm breadcrumbs">
			<ul>
				{crumbs.map((crumb) => (
					<li key={`breadcrumb ${crumb}`}>
						<Link href={'/cms' + (crumb === 'cms' ? '' : '/' + crumb)}>
							{crumb === 'cms' ? 'Dashboard' : capitalize(crumb)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
