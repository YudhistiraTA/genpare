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
			<figure className='lg:pt-0 pt-2'>
				<Image
					src={imageUrl}
					alt={`Image of ${title}`}
					width={256}
					height={256}
					priority
					className='w-64 h-64'
					unoptimized
				/>
			</figure>
			<div className="card-body text-left max-w-[313px]">
				<h2 className="card-title tracking-tight text-2xl">{title}</h2>
				{body}
			</div>
		</div>
	)
}
