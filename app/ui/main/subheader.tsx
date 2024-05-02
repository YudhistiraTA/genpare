import AlbumSearchbar from '@/app/ui/main/album/searchbar'

export default function Subheader({
	title,
	subtitle,
	disableSearchbar = false,
}: {
	title: string
	subtitle?: string
	disableSearchbar?: boolean
}) {
	return (
		<div className="flex flex-col gap-4 bg-secondary text-base-100 text-4xl px-2 lg:px-96 py-7 tracking-wider">
			<div className='flex items-center gap-4'>
				<h1>{title.toUpperCase()}</h1>
				{subtitle && <h2 className="text-xl text-base-100">{subtitle}</h2>}
			</div>
			{!disableSearchbar && <AlbumSearchbar />}
		</div>
	)
}
