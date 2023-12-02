import Image from 'next/image'
import { ReactNode } from 'react'

export function Card({
	imageUrl,
	title,
	body,
}: {
	imageUrl: string
	title: string
	body: ReactNode
}) {
	return (
		<div className="card glass bg-opacity-60 lg:card-side bg-white shadow-xl">
			<figure>
				<Image
					src={imageUrl}
					alt={`Image of ${title}`}
					width={300}
					height={300}
					priority
				/>
			</figure>
			<div className="card-body text-left">
				<h2 className="card-title tracking-tight text-2xl">{title}</h2>
				{body}
			</div>
		</div>
	)
}
