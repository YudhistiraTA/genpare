'use client'
export function KofiEmbed() {
	const iframeSrc =
		'https://ko-fi.com/genpare/?hidefeed=true&widget=true&embed=true&preview=true'
	const resetIframe = () => {
		const iframe = document.getElementById('kofiframe') as HTMLIFrameElement
		if (iframe) {
			iframe.src = iframeSrc
		}
	}
	return (
		<>
			<button
				className="btn btn-ghost"
				onClick={() =>
					(document.getElementById('ko-fi') as HTMLDialogElement)?.showModal()
				}
			>
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="m23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593h-18.299c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028v-5.681h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
				</svg>
			</button>
			<dialog id="ko-fi" className="modal" onClose={resetIframe}>
				<div className="modal-box">
					<iframe
						id="kofiframe"
						src={iframeSrc}
						style={{
							border: 'none',
							width: '100%',
							padding: '4px',
							background: '#f9f9f9',
						}}
						height="712"
						title="genpare"
					></iframe>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	)
}
