'use client'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
const YouTubePlayer = ({
	videoId,
	title,
}: {
	videoId: string
	title: string
}) => {
	return (
		<LiteYouTubeEmbed
			id={videoId}
			title={title}
			webp
		/>
	)
}

export default YouTubePlayer
