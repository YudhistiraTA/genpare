import { getTranslator } from '@/app/lib/api/actors'
import { capitalizeAll } from '@/app/lib/capitalizeAll'
import { InteractiveCard } from '@/app/ui/interactiveCard'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(
	{ params: { slug } }: { params: { slug: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [translator] = await getTranslator(slug)
	const prevMeta = await parent
	return {
		title: translator.name,
		description: `Discography involving ${translator.name} as translator`,
		keywords: [...(prevMeta.keywords ?? []), 'Translator', translator.name],
		alternates: {
			canonical: `https://www.gengo-parade.com/translator/${translator.slug}`,
		},
		...(prevMeta.openGraph && {
			openGraph: {
				...prevMeta.openGraph,
				url: 'https://www.gengo-parade.com',
				title: translator.name,
				description: `Discography involving ${translator.name} as translator`,
			},
		}),
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const [translator, albums] = await getTranslator(slug)
	return (
		<main className="flex flex-col items-center">
			<h1 className="font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight text-3xl px-6 py-2 rounded-xl">
				{capitalizeAll(translator.name)}
			</h1>
			<div className="lg:grid-cols-2 grid lg:gap-8 gap-4 my-4">
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
											let roles = item.Lyrics.map((lyric) => lyric.language)

											let rolesString = ''
											if (roles.length > 1) {
												rolesString =
													roles.slice(0, -1).join(', ') +
													' and ' +
													roles.slice(-1) +
													' translator'
											} else if (roles.length === 1) {
												rolesString = roles[0] + ' translator'
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
		</main>
	)
}
