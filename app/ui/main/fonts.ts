import { Cherry_Bomb_One, Comfortaa, Roboto } from 'next/font/google'

export const comfortaa = Comfortaa({
	weight: ['400'],
	subsets: ['latin'],
})
export const cherryBomb = Cherry_Bomb_One({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: false
})
export const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: false
})