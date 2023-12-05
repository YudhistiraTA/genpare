import { getArtist } from '@/app/lib/api/actors'
import { capitalizeAll } from '@/app/lib/capitalizeAll'
import { InteractiveCard } from '@/app/ui/interactiveCard'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [artist] = await getArtist(slug)
	const prevMeta = await parent
	return {
		title: artist.name,
		description: `Discography involving ${artist.name}`,
		keywords: [...(prevMeta.keywords ?? []), 'Artist', artist.name],
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [artist, albums] = await getArtist(slug)
	return (
		<main className="flex flex-col items-center">
			<h1 className="font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight text-3xl px-6 py-2 rounded-xl">
				{capitalizeAll(artist.name)}
			</h1>
			<section className="flex flex-col items-center justify-between px-2 lg:px-24">
				<div className="lg:flex grid lg:gap-8 gap-4 my-4">
					{albums.map((album) => (
						<InteractiveCard
							slug={album.slug}
							key={album.id}
							imageUrl={album.imageUrl}
							title={album.name}
							body={
								<ul className="menu -ml-6 -mt-2">
									<li>
										<h2 className="menu-title">Songs</h2>
										<ul className="-mt-3">
											{album.Song.map((item) => {
												let roles = []
												if (item.Composer.length > 0) roles.push('Composer')
												if (item.Lyrics.length > 0) roles.push('Lyricist')
												if (item.Vocals.length > 0) roles.push('Vocalist')

												let rolesString = ''
												if (roles.length > 1) {
													rolesString =
														roles.slice(0, -1).join(', ') +
														' and ' +
														roles.slice(-1)
												} else if (roles.length === 1) {
													rolesString = roles[0]
												}
												return (
													<li key={`list_${item.id}`}>
														<Link
															href={`/song/${item.slug}`}
															className="flex flex-col self-start w-full hover:bg-primary hover:bg-opacity-20"
														>
															<p className="self-start">
																{item.trackNo}
																{'. '}
																{item.name}
															</p>
															<p className="pl-6 text-sm -mt-2 text-slate-400 self-start">
																{rolesString.length > 0 && `As ${rolesString}`}
															</p>
														</Link>
													</li>
												)
											})}
										</ul>
									</li>
								</ul>
							}
						/>
					))}
				</div>
			</section>
		</main>
	)
}
