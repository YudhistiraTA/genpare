'use client'
import YouTube from 'react-youtube'
const YouTubePlayer = ({
	videoId,
	className,
}: {
	videoId: string
	className?: string
}) => {
	return <YouTube className={className} videoId={videoId} />
}

export default YouTubePlayer
