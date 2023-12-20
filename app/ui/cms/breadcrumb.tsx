'use client'

import { capitalize } from '@/app/lib/capitalize'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
	const path = usePathname()
	const crumbs = path.split('/').filter((crumb) => crumb)
	return (
		<div className="breadcrumbs">
			<ul>
				{crumbs.map((crumb, index, array) => (
					<li key={`breadcrumb ${crumb}`}>
						{index === array.length - 1 ? (
							<p className='text-gray-500'>{crumb === 'cms' ? 'Dashboard' : capitalize(crumb)}</p>
						) : (
							<Link href={'/cms' + (crumb === 'cms' ? '' : '/' + crumb)}>
								{crumb === 'cms' ? 'Dashboard' : capitalize(crumb)}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
