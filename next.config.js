/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'medium-media.vgm.io',
			},
			{
				protocol: 'https',
				hostname: 'cdn.gengo-parade.com',
			},
		],
	},
}

module.exports = nextConfig
