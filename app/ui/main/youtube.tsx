'use client'
import clsx from 'clsx'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
const YouTubePlayer = ({
	videoId,
	title,
	className
}: {
	videoId: string
	title: string
	className?: string
}) => {
	return (
		<div className={clsx('pt-4 px-4', className)}>
			<LiteYouTubeEmbed id={videoId} title={title} webp />
		</div>
	)
}

export default YouTubePlayer
