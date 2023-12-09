'use client'

import { usePathname } from 'next/navigation'

export default function ScrollToTop({ className }: { className?: string }) {
	const path = usePathname()
	if (!path.includes('/song/')) return <></>
	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			style={{ marginTop: 'calc(100vh + 200px)' }}
			className={className}
		>
			<svg
				fill="currentColor"
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<g>
					<g>
						<g>
							<path
								d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z
M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256
S385.387,485.333,256,485.333z"
							/>
							<path
								d="M264.32,147.947c-4.053-4.587-10.987-5.013-15.573-0.96c-0.32,0.32-0.64,0.64-0.96,0.96L109.12,318.613
c-3.733,4.587-2.987,11.307,1.6,15.04s11.307,2.987,15.04-1.6L256,171.627l130.347,160.427c3.733,4.587,10.453,5.227,15.04,1.6
c4.587-3.733,5.227-10.453,1.6-15.04L264.32,147.947z"
							/>
						</g>
					</g>
				</g>
			</svg>
		</button>
	)
}
