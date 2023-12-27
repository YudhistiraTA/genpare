import { deleteActor } from '@/app/lib/api/cms/actor/deleteActor'
import { fetchActor } from '@/app/lib/api/cms/actor/fetchActor'

export function DeleteButton({
	data,
}: {
	data: Awaited<ReturnType<typeof fetchActor>>
}) {
	return (
		<>
			<button
				className="btn btn-error"
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
						Delete actor <strong>{data.name}</strong>?
					</p>
					<div className="modal-action">
						<div className="flex gap-4">
							<button
								className="btn btn-error"
								type="button"
								onClick={async () => await deleteActor(data)}
							>
								Delete
							</button>
							<button
								className="btn"
                type='button'
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
