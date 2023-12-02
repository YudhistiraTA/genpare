import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

export function Card({
	imageUrl,
	title,
	body,
	slug,
}: {
	imageUrl: string
	title: string
	body: ReactNode
	slug: string
}) {
	return (
		<div className="card glass bg-opacity-60 lg:card-side bg-white shadow-xl">
			<figure>
				<Link href={`/album/${slug}`}>
					<Image
						src={imageUrl}
						alt={`Image of ${title}`}
						width={300}
						height={300}
						priority
					/>
				</Link>
			</figure>
			<div className="card-body text-left">
				<Link href={`/album/${slug}`}>
					<h2 className="card-title tracking-tight text-2xl">{title}</h2>
				</Link>
				{body}
			</div>
		</div>
	)
}
