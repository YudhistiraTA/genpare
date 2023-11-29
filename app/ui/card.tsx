import Image from 'next/image'

export function Card({
	imageUrl,
	title,
	description,
}: {
	imageUrl: string
	title: string
	description: string
}) {
	return (
		<div className="card lg:card-side bg-base-100 shadow-xl">
			<figure>
				<Image src={imageUrl} alt={`Image of ${title}`} width={300} height={300} priority />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
			</div>
		</div>
	)
}
