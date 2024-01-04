import { deleteAlbum } from '@/app/lib/api/cms/album/deleteAlbum'
import { fetchAlbum } from '@/app/lib/api/cms/album/fetchAlbum'
import { languageCode } from '@/app/lib/languageCode'

export async function DeleteButton({
	data,
}: {
	data: Awaited<ReturnType<typeof fetchAlbum>>
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
						Delete album <strong>{data.name}</strong>?
					</p>
					{data.Song.length > 0 ? (
						<div>
							<p>This album contains the following songs</p>
							<ul>
								{data.Song.map((song) => {
									const filteredLyrics = song.Lyrics.filter(
										(item) =>
											item.language !== 'japanese' &&
											item.language !== 'romaji',
									)
									return (
										<li
											key={song.id}
											className="border-l-2 border-l-red-300 ml-2 pl-2 mt-1"
										>
											{song.name}{' '}
											{filteredLyrics.length > 0 ? (
												<span>
													(
													{filteredLyrics
														.map((item) => languageCode.get(item.language))
														.join(', ')}
													)
												</span>
											) : null}
										</li>
									)
								})}
							</ul>
							<p>These songs and their translations will also be deleted!</p>
						</div>
					) : null}
					<div className="modal-action">
						<div className="flex gap-4">
							<button
								className="btn btn-error"
								type="button"
								onClick={async () => await deleteAlbum(data)}
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
