export default function Loading() {
	return (
		<div className="hero">
			<div className="hero-content flex-col lg:flex-row gap-10">
				<div className="skeleton w-64 h-64 max-w-sm rounded-2xl shadow-2xl" />
				<div className="flex flex-col glass bg-white bg-opacity-60 gap-2 border shadow-lg px-6 pt-4 rounded-2xl">
					<div className="skeleton w-64 h-12"></div>
					<div className="skeleton w-32 h-6"></div>
					<div className="skeleton w-40 h-6"></div>
					<div className="skeleton w-52 h-6"></div>
					<div className="skeleton w-44 h-6"></div>
					<div className="skeleton w-32 h-6"></div>
					<div className="skeleton w-32 h-6"></div>
					<div className="skeleton w-20 h-6"></div>
					<div className="skeleton w-32 h-6 ml-6"></div>
					<div className="skeleton w-32 h-6 ml-6"></div>
					<div className="skeleton w-32 h-6 ml-6 mb-4"></div>
				</div>
			</div>
		</div>
	)
}
