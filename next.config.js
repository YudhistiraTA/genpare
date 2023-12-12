/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'medium-media.vgm.io',
			},
		],
	},
	webpack: (config) => {
		config.externals = [...config.externals, 'bcrypt']
		return config
	},
}

module.exports = nextConfig
