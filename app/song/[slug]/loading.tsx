import { AlbumDetailSkeleton } from '@/app/ui/song/albumDetailSkeleton'
import { SongDetailSkeleton } from '@/app/ui/song/songDetailSkeleton'

export default function Loading() {
	return (
		<section className="grid lg:grid-cols-3 grid-cols-1">
			<div className="lg:hidden glass collapse shadow collapse-arrow mb-4">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Song Detail</div>
				<div className="collapse-content">
					<SongDetailSkeleton />
				</div>
			</div>
			<div className="lg:hidden glass collapse shadow collapse-arrow">
				<input type="checkbox" />
				<div className="collapse-title text-xl font-medium">Album Detail</div>
				<div className="collapse-content">
					<AlbumDetailSkeleton />
				</div>
			</div>
			<SongDetailSkeleton className="lg:block hidden" />
			<AlbumDetailSkeleton className="lg:block hidden" />
			<div></div>
			<article className="flex flex-col text-left gap-2 card shadow glass rounded-3xl lg:mt-0 mt-4">
				<div className="card-body whitespace-pre-wrap">
					<section className='lg:flex lg:flex-row lg:justify-between grid'>
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
			<div> </div>
		</section>
	)
}
