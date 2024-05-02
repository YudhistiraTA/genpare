import AlbumSearchbar from '@/app/ui/main/album/searchbar'

export default function Subheader({
	title,
	disableSearchbar = false,
}: {
	title: string
	disableSearchbar?: boolean
}) {
	return (
		<div className="flex flex-col gap-4 bg-secondary text-base-100 text-4xl px-2 lg:px-96 py-7 tracking-wider">
			<h1>{title.toUpperCase()}</h1>
			{!disableSearchbar && <AlbumSearchbar />}
		</div>
	)
}
