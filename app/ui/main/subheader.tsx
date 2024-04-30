import AlbumSearchbar from '@/app/ui/main/album/searchbar'

export default function Subheader({ title }: { title: string }) {
	return (
		<div className="flex flex-col gap-4 bg-primary text-base-100 text-4xl px-96 py-7 tracking-wider">
			<h1>{title.toUpperCase()}</h1>
			<AlbumSearchbar />
		</div>
	)
}
