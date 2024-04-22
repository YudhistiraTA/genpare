import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				default: '#343B45',
			},
			placeholderColor: {
				default: '#808080',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				genpare: {
					'base-100': 'FCF5ED',
					neutral: 'F4BF96',
					primary: 'CE5A67',
					secondary: '1F1717',
				},
			},
			'dark',
		],
	},
}
export default config
