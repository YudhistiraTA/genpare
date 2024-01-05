import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'

const kuroshiro = new Kuroshiro()

let isInitialized = false // <-- Flag to check if kuroshiro is initialized

export const toRomaji = async (str: string): Promise<string> => {
	if (!isInitialized) {
		await kuroshiro.init(
			new KuromojiAnalyzer({
				dictPath: '/dict',
			}),
		) // <-- Initialize only once
		isInitialized = true
	}
	return kuroshiro.convert(str, { to: 'romaji' })
}
