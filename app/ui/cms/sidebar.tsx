'use client'

import { comfortaa } from '@/app/ui/main/fonts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
	const path = usePathname()
	return (
		<div className="drawer-side">
			<label
				htmlFor="my-drawer-3"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<ul className="menu p-4 text-lg w-80 min-h-full lg:gap-0 bg-[#272F38]">
				<div className="hidden lg:flex lg:justify-center pb-4 items-center gap-4">
					<Link href="/cms">
						<Image
							src="/logo.webp"
							alt="genpare logo"
							width={60}
							height={60}
							className="rounded-full"
							priority
						/>
					</Link>
					<Link href="/cms">
						<p className={comfortaa.className}>Gengo Parade CMS</p>
					</Link>
				</div>
				{/* Sidebar content here */}
				<li className="mb-1">
					<Link
						href="/cms"
						className={clsx(
							'hover:pl-6 hover:outline-0 hover:bg-[#343B45] transition-all',
							{
								'pl-6 bg-[#343B45]': path === '/cms',
							},
						)}
					>
						<svg
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M15 18H9"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<p>Dashboard</p>
					</Link>
				</li>
				<li className="mb-1">
					<Link
						href="/cms/actor"
						className={clsx(
							'hover:pl-6 hover:outline-0 hover:bg-[#343B45] transition-all',
							{
								'pl-6 bg-[#343B45]': path === '/cms/actor',
							},
						)}
					>
						<svg
							width="24px"
							height="24px"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="profile">
								<g id="profile_2">
									<path
										id="Combined Shape"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M32.2301 22.2985C30.2149 24.5691 27.2745 25.9998 24 25.9998C17.925 25.9998 13 21.0754 13 14.9998C13 8.92552 17.9257 3.9998 24 3.9998C30.0743 3.9998 35 8.92552 35 14.9998C35 17.0807 34.4222 19.0266 33.4184 20.6859C37.4029 23.2673 39.9994 27.4474 39.9994 32.1866V40.9786C39.9994 42.6369 38.6577 43.9786 36.9994 43.9786H10.9994C9.34257 43.9786 7.99939 42.6364 7.99939 40.9786V32.1866C7.99939 28.5756 9.51984 25.1783 12.201 22.5769C12.5974 22.1923 13.2305 22.2019 13.6151 22.5983C13.9997 22.9946 13.9901 23.6277 13.5937 24.0123C11.2906 26.2469 9.99939 29.132 9.99939 32.1866V40.9786C9.99939 41.5315 10.4468 41.9786 10.9994 41.9786H36.9994C37.5531 41.9786 37.9994 41.5323 37.9994 40.9786V32.1866C37.9994 28.1349 35.7312 24.5261 32.2301 22.2985ZM30.4104 21.3171C28.7782 22.9732 26.5089 23.9998 24 23.9998C19.0296 23.9998 15 19.9708 15 14.9998C15 10.0301 19.0303 5.9998 24 5.9998C28.9697 5.9998 33 10.0301 33 14.9998C33 16.7236 32.5154 18.3341 31.6751 19.7026C29.394 18.5927 26.7773 17.9626 23.9994 17.9626C23.4471 17.9626 22.9994 18.4103 22.9994 18.9626C22.9994 19.5149 23.4471 19.9626 23.9994 19.9626C26.313 19.9626 28.4918 20.452 30.4104 21.3171Z"
										fill="currentColor"
									/>
								</g>
							</g>
						</svg>
						<p>Actor</p>
					</Link>
				</li>
				<li className="mb-1">
					<Link
						href="/cms/album"
						className={clsx(
							'hover:pl-6 hover:outline-0 hover:bg-[#343B45] transition-all',
							{
								'pl-6 bg-[#343B45]': path === '/cms/album',
							},
						)}
					>
						<svg
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15 2.19995C19.5645 3.12649 23 7.162 23 11.9999C23 16.8378 19.5645 20.8733 15 21.7999"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M15 9C16.1411 9.28364 17 10.519 17 12C17 13.481 16.1411 14.7164 15 15"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M1 2L11 2L11 22L1 22"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 15.5C4 16.3284 3.32843 17 2.5 17C1.67157 17 1 16.3284 1 15.5C1 14.6716 1.67157 14 2.5 14C3.32843 14 4 14.6716 4 15.5Z"
								fill="currentColor"
							/>
							<path
								d="M4 15.5C4 16.3284 3.32843 17 2.5 17C1.67157 17 1 16.3284 1 15.5C1 14.6716 1.67157 14 2.5 14C3.32843 14 4 14.6716 4 15.5ZM4 15.5V7.6C4 7.26863 4.26863 7 4.6 7H7"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<p>Album</p>
					</Link>
				</li>
				<li className="mb-1">
					<Link
						href="/cms/song"
						className={clsx(
							'hover:pl-6 hover:outline-0 hover:bg-[#343B45] transition-all',
							{
								'pl-6 bg-[#343B45]': path === '/cms/song',
							},
						)}
					>
						<svg
							width="24px"
							height="24px"
							viewBox="-0.5 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 22.42C8.20914 22.42 10 20.6292 10 18.42C10 16.2109 8.20914 14.42 6 14.42C3.79086 14.42 2 16.2109 2 18.42C2 20.6292 3.79086 22.42 6 22.42Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M18 20.42C20.2091 20.42 22 18.6292 22 16.42C22 14.2109 20.2091 12.42 18 12.42C15.7909 12.42 14 14.2109 14 16.42C14 18.6292 15.7909 20.42 18 20.42Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M10 18.4099V9.5C9.99907 8.0814 10.5008 6.70828 11.4162 5.62451C12.3315 4.54074 13.6012 3.81639 15 3.57996L22 2.40991V16.4099"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<p>Song</p>
					</Link>
				</li>
				<li className="mb-1">
					<Link href="/" className="hover:pl-6 hover:outline-0 transition-all">
						<svg
							width="24px"
							height="24px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 4.5H8C5.64298 4.5 4.46447 4.5 3.73223 5.23223C3 5.96447 3 7.14298 3 9.5V10M9 19.5H8C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V14"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M13.6576 2.34736C11.4955 1.97026 10.4145 1.78171 9.70725 2.4087C9 3.03569 9 4.18259 9 6.4764V17.5236C9 19.8174 9 20.9643 9.70725 21.5913C10.4145 22.2183 11.4955 22.0297 13.6576 21.6526L15.9864 21.2465C18.3809 20.8288 19.5781 20.62 20.2891 19.7417C21 18.8635 21 17.5933 21 15.0529V8.94711C21 6.40672 21 5.13652 20.2891 4.25826C19.814 3.67133 19.1217 3.38338 18 3.13228"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M12 11V13"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<p>Exit CMS</p>
					</Link>
				</li>
			</ul>
		</div>
	)
}
