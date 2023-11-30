'use client'
import YouTube from 'react-youtube'
const YouTubePlayer = ({
	videoId,
	className,
	height = '390',
	width = '640',
}: {
	videoId: string
	className?: string
	width?: string
	height?: string
}) => {
	const opts = {
		height,
		width,
	}
	return <YouTube opts={opts} iframeClassName={className} videoId={videoId} />
}

export default YouTubePlayer
