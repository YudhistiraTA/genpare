import { getRecentChanges } from '@/app/lib/api/news/getRecentChanges'
import SocialEmbed from '@/app/ui/main/socialEmbed'
import dayjs from 'dayjs'
import Link from 'next/link'

const colorMap = ['bg-pink-200', 'bg-blue-200', 'bg-green-200']

async function RecentInformationData() {
	const data = await getRecentChanges(3)
	return (
		<div className="flex flex-col gap-2">
			<h1 className="mb-4">RECENT UPDATES</h1>
			{data.map((song, index) => (
				<Link key={song.id} href={`/song/${song.slug}`}>
					<div className="flex md:gap-4 items-center">
						<div className={`${colorMap[index]} rounded-full w-4 h-4 mr-2`}>
							{' '}
						</div>
						<p className="font-semibold mr-2 md:mr-0">
							{dayjs(song.updatedAt).format('YYYY.MM.DD') || '-'}
						</p>
						<div className="flex">
							<p className="lg:block hidden mr-2">{song.Album.name} - </p>
							<h2>{song.name}</h2>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default function RecentInformation() {
	return (
		<div className="flex justify-evenly items-center bg-white py-8 md:px-64 gap-4 md:gap-0 px-4 flex-col md:flex-row tracking-wider text-sm">
			<RecentInformationData />
			<SocialEmbed />
		</div>
	)
}
