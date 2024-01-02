export function youtubeIdExtract(value: string) {
	const patterns = [
		/youtube\.com\/watch\?v=([^\&\?\/]+)/,
		/youtube\.com\/embed\/([^\&\?\/]+)/,
		/youtube\.com\/v\/([^\&\?\/]+)/,
		/youtu\.be\/([^\&\?\/]+)/,
		/youtube\.com\/verify_age\?next_url=\/watch%3Fv%3D([^\&\?\/]+)/,
	]
	for (const pattern of patterns) {
		const match = value.match(pattern)
		if (match && match[1]) {
			return match[1]
		}
	}
	return value
}
