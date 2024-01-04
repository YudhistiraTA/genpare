import { fetchTableData, filterOptions } from '@/app/lib/api/cms/song/tableData'
import { languageCode } from '@/app/lib/languageCode'
import { Language } from '@prisma/client'
import Link from 'next/link'

export async function SongTable({
	query,
	untranslated,
	order,
}: {
	query: string
	untranslated: Language
	order: (typeof filterOptions)[number]['value']
}) {
	const data = await fetchTableData({ query, untranslated, order })
	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					<td>Name</td>
					<td>Translations</td>
					<td>Slug</td>
					<td>Youtube ID</td>
					<td>Album</td>
					<td>Track No.</td>
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
						<td>
							<Link
								href={`https://youtu.be/${song.youtubeId}`}
								className="underline text-blue-400"
								target="_blank"
							>
								{song.youtubeId}
							</Link>
						</td>

						<td>
							{song.Album.name} ({song.Album.releaseYear})
						</td>
						<td>
							{song.trackNo}/{song.Album.totalTrack}
						</td>

						<th className="dropdown table-cell dropdown-left py-9 lg:py-5">
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
								className="dropdown-content lg:-mt-5 mt-5 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-2 border-default"
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
								<li>
									<Link href={`song/${song.slug}/lyrics`}>
										<svg
											viewBox="0 0 24 24"
											width={24}
											height={24}
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M20.58 19.37L17.59 11.01C17.38 10.46 16.91 10.12 16.37 10.12C15.83 10.12 15.37 10.46 15.14 11.03L12.16 19.37C12.02 19.76 12.22 20.19 12.61 20.33C13 20.47 13.43 20.27 13.57 19.88L14.19 18.15H18.54L19.16 19.88C19.27 20.19 19.56 20.38 19.87 20.38C19.95 20.38 20.04 20.37 20.12 20.34C20.51 20.2 20.71 19.77 20.57 19.38L20.58 19.37ZM14.74 16.64L16.38 12.05L18.02 16.64H14.74ZM12.19 7.85C9.92999 11.42 7.89 13.58 5.41 15.02C5.29 15.09 5.16 15.12 5.04 15.12C4.78 15.12 4.53 14.99 4.39 14.75C4.18 14.39 4.3 13.93 4.66 13.73C6.75999 12.51 8.48 10.76 10.41 7.86H4.12C3.71 7.86 3.37 7.52 3.37 7.11C3.37 6.7 3.71 6.36 4.12 6.36H7.87V4.38C7.87 3.97 8.21 3.63 8.62 3.63C9.02999 3.63 9.37 3.97 9.37 4.38V6.36H13.12C13.53 6.36 13.87 6.7 13.87 7.11C13.87 7.52 13.53 7.86 13.12 7.86H12.18L12.19 7.85ZM12.23 15.12C12.1 15.12 11.97 15.09 11.85 15.02C11.2 14.64 10.57 14.22 9.97999 13.78C9.64999 13.53 9.58 13.06 9.83 12.73C10.08 12.4 10.55 12.33 10.88 12.58C11.42 12.99 12.01 13.37 12.61 13.72C12.97 13.93 13.09 14.39 12.88 14.75C12.74 14.99 12.49 15.12 12.23 15.12Z"
												fill="currentColor"
											/>
										</svg>
										<p>Lyrics</p>
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
