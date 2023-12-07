import { AlbumDetailSkeleton } from '@/app/ui/song/albumDetailSkeleton'
import { SongDetailSkeleton } from '@/app/ui/song/songDetailSkeleton'

export default function Loading() {
	return (
		<section className="grid lg:flex lg:justify-center gap-6 grid-cols-1">
			<section id="mobile-detail" className="lg:hidden">
				<div className="glass collapse shadow collapse-arrow mb-4">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">Song Detail</div>
					<div className="collapse-content">
						<SongDetailSkeleton />
					</div>
				</div>
				<div className="glass collapse shadow collapse-arrow">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">Album Detail</div>
					<div className="collapse-content">
						<AlbumDetailSkeleton />
					</div>
				</div>
			</section>
			<article className="flex flex-col text-left gap-2 card shadow glass rounded-3xl lg:mt-0 mt-4">
				<div className="card-body whitespace-pre-wrap">
					<section className="lg:flex lg:flex-row lg:justify-between grid">
						<div className="mt-4">
							<div className="skeleton w-72 h-10"></div>
						</div>
						<div className="mt-4">
							<div className="skeleton w-72 h-10"></div>
						</div>
					</section>
					{[...Array(20)].map((_, i) => {
						const randomWidth = Math.floor(Math.random() * (100 - 50 + 1)) + 50
						return (
							<div
								key={`lyrics skeleton ${i}`}
								className="skeleton h-12"
								style={{ width: `${randomWidth}%` }}
							></div>
						)
					})}
				</div>
			</article>
			<div id="desktop-detail" className="lg:flex lg:flex-col hidden gap-4">
				<AlbumDetailSkeleton />
				<div className="sticky top-6">
					<SongDetailSkeleton />
				</div>
			</div>
		</section>
	)
}
