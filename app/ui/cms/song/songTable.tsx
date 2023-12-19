import { fetchTableData } from '@/app/lib/api/cms/song/tableData'
import { languageCode } from '@/app/lib/languageCode'
import { Language } from '@prisma/client'
import Link from 'next/link'

export async function SongTable({
	query,
	untranslated,
	orderType = 'albumName',
}: {
	query: string
	untranslated: Language
	orderType: 'albumName' | 'releaseYear' | 'latestEntry'
}) {
	const data = await fetchTableData({ query, untranslated, orderType })
	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					<td>Name</td>
					<td>Translations</td>
					<td>Slug</td>
					<td>Youtube ID</td>
					<td>Track No.</td>
					<td>Album</td>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.map((song) => (
					<tr key={song.id}>
						<td>{song.name}</td>
						<td>
							{song.Lyrics.map((item) => languageCode.get(item.language)).join(
								', ',
							)}
						</td>
						<td>{song.slug}</td>
						<td>{song.youtubeId}</td>
						<td>
							{song.trackNo}/{song.Album.totalTrack}
						</td>
						<td>
							{song.Album.name} ({song.Album.releaseYear})
						</td>

						<th className="dropdown dropdown-left py-9">
							<svg
								fill="currentColor"
								version="1.1"
								id="Capa_1"
								viewBox="0 0 32.055 32.055"
								role="button"
								tabIndex={0}
								className="w-6"
							>
								<g>
									<path
										d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
									/>
								</g>
							</svg>
							<ul
								tabIndex={0}
								className="dropdown-content mt-5 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-2 border-[#343B45]"
							>
								<li>
									<Link href={`song/${song.slug}`}>
										<svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
											<path
												d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<p>Edit</p>
									</Link>
								</li>
							</ul>
						</th>
					</tr>
				))}
			</tbody>
		</table>
	)
}
