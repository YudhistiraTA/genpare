/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.gengo-parade.com',
			},
		],
	},
	webpack: (config) => {
		config.externals = [...config.externals, 'bcrypt']
		return config
	},
}

module.exports = nextConfig
