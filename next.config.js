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
			{
				protocol: 'https',
				hostname: 'daisyui.com',
			},
		],
	},
	webpack: (config) => {
		config.externals = [...config.externals, 'bcrypt']
		return config
	},
}

module.exports = nextConfig
