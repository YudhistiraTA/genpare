import prisma from '@/prisma/config'
import { Language } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export async function fetchLyrics(slug: string) {
	unstable_noStore()
	try {
		const song = await prisma.song.findUniqueOrThrow({
			where: { slug },
			select: {
				Lyrics: {
					select: { content: true, creatorId: true, id: true, language: true },
				},
				id: true,
				name: true,
				slug: true,
			},
		})

		// Define the order of languages
		const languageOrder: Language[] = [
			'japanese',
			'romaji',
			'english',
			'spanish',
			'french',
			'korean',
		]

		// Sort the lyrics
		song.Lyrics.sort((a, b) => {
			return (
				languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language)
			)
		})

		return song
	} catch (error) {
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === 'P2025'
		)
			redirect('/cms/song')
		else throw new Error('Unknown Error')
	}
}
