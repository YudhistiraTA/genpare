import { deleteSong } from '@/app/lib/api/cms/song/deleteSong'
import { fetchSong } from '@/app/lib/api/cms/song/fetchSong'
import { capitalize } from '@/app/lib/capitalize'

export async function DeleteButton({
	data,
}: {
	data: Awaited<ReturnType<typeof fetchSong>>
}) {
	return (
		<>
			<button
				className="btn btn-error ml-4"
				type="button"
				onClick={() =>
					(
						document.getElementById('my_modal_1') as HTMLDialogElement
					)?.showModal()
				}
			>
				Delete
			</button>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Confirm Deletion</h3>
					<p className="py-4">
						Delete song <strong>{data.name}</strong>?
					</p>
					{data.Lyrics.length > 0 ? (
						<div>
							<p>This song contains the following translations</p>
							<ul>
								{data.Lyrics.filter(
									(lyric) =>
										lyric.language !== 'japanese' &&
										lyric.language !== 'romaji',
								).map((lyrics) => (
									<li
										key={lyrics.id}
										className="border-l-2 border-l-red-300 ml-2 pl-2 mt-1"
									>
										{capitalize(lyrics.language)}
									</li>
								))}
							</ul>
							<p>These translations will also be deleted!</p>
						</div>
					) : null}
					<div className="modal-action">
						<div className="flex gap-4">
							<button
								className="btn btn-error"
								type="button"
								onClick={async () => await deleteSong(data)}
							>
								Delete
							</button>
							<button
								className="btn"
								type="button"
								onClick={() =>
									(
										document.getElementById('my_modal_1') as HTMLDialogElement
									)?.close()
								}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
