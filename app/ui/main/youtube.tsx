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
		<div className='pt-4 px-4'>
			<LiteYouTubeEmbed id={videoId} title={title} webp />
		</div>
	)
}

export default YouTubePlayer
