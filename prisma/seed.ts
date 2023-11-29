import { createReadStream } from 'fs'
import path from 'path'
import csv from 'csv-parse'
import { toRomaji } from './kuroshiro'
import slug from 'slug'
import prisma from './config'
import { Language } from '@prisma/client'

type Lyrics = {
	content: string
	creator: NameSlug
}
type Album = {
	name: string
	slug: string
	releaseYear: number
	totalTracks: number
	imageUrl: string
	circle: NameSlug
}
type LanguagePayload = {
	japanese: Lyrics
	romaji: Lyrics
	english: Lyrics
	french: Lyrics
	spanish: Lyrics
}
function isLanguage(value: string): value is Language {
	return Object.values(Language).includes(value as Language)
}
type NameSlug = {
	name: string
	slug: string
}
type Payload = {
	songName: string
	songSlug: string
	artist: NameSlug
	vocals: NameSlug[]
	youtubeLink: string
	trackNo: number
	lyrics: LanguagePayload
	album: Album
}

const csvColumn = {
	songName: '0',
	youtubeLink: '1',
	trackNo: '2',
	japaneseLyrics: '3',
	romajiLyrics: '4',
	japaneseLyricist: '5',
	frenchLyrics: '6',
	frenchTranslator: '7',
	englishLyrics: '8',
	englishTranslator: '9',
	spanishLyrics: '10',
	spanishTranslator: '11',
	artistName: '12',
	vocals: '13',
	albumName: '14',
	albumReleaseYear: '15',
	albumImage: '16',
	albumTotalTracks: '17',
	circle: '18',
} as const

function payloadParse() {
	const data: Payload[] = []
	const promises: Promise<void>[] = []
	return new Promise<Payload[]>((res, rej) => {
		const filename = path.join(process.cwd(), 'prisma', 'data', 'payload.csv')
		createReadStream(filename)
			.pipe(csv.parse({ delimiter: '|' }))
			.on('data', (chunk: string[]) => {
				const promise = (async () => {
					const songRomaji = await toRomaji(chunk[csvColumn.songName])
					const albumRomaji = await toRomaji(chunk[csvColumn.albumName])
					const artistRomaji = await toRomaji(chunk[csvColumn.artistName])
					const circleRomaji = await toRomaji(chunk[csvColumn.circle])
					const japaneseLyricistRomaji = await toRomaji(
						chunk[csvColumn.japaneseLyricist],
					)
					const englishTranslatorRomaji = await toRomaji(
						chunk[csvColumn.englishTranslator],
					)
					const frenchTranslatorRomaji = await toRomaji(
						chunk[csvColumn.frenchTranslator],
					)
					const spanishTranslatorRomaji = await toRomaji(
						chunk[csvColumn.spanishTranslator],
					)
					const vocalRomaji = await Promise.all(
						chunk[csvColumn.vocals]
							.split('&')
							.map(async (vocal) => await toRomaji(vocal)),
					)
					data.push({
						songName: chunk[csvColumn.songName],
						songSlug: slug(songRomaji),
						artist: {
							name: chunk[csvColumn.artistName],
							slug: slug(artistRomaji),
						},
						trackNo: Number(chunk[csvColumn.trackNo]),
						youtubeLink: chunk[csvColumn.youtubeLink],
						album: {
							name: chunk[csvColumn.albumName],
							slug: slug(albumRomaji),
							releaseYear: Number(chunk[csvColumn.albumReleaseYear]),
							totalTracks: Number(chunk[csvColumn.albumTotalTracks]),
							circle: {
								name: chunk[csvColumn.circle],
								slug: slug(circleRomaji),
							},
							imageUrl: chunk[csvColumn.albumImage],
						},
						vocals: vocalRomaji.map((vocal) => ({
							name: vocal,
							slug: slug(vocal),
						})),
						lyrics: {
							japanese: {
								content: chunk[csvColumn.japaneseLyrics],
								creator: {
									name: chunk[csvColumn.japaneseLyricist],
									slug: slug(japaneseLyricistRomaji),
								},
							},
							romaji: {
								content: chunk[csvColumn.romajiLyrics],
								creator: {
									name: chunk[csvColumn.japaneseLyricist],
									slug: slug(japaneseLyricistRomaji),
								},
							},
							english: {
								content: chunk[csvColumn.englishLyrics],
								creator: {
									name: chunk[csvColumn.englishTranslator],
									slug: slug(englishTranslatorRomaji),
								},
							},
							french: {
								content: chunk[csvColumn.frenchLyrics],
								creator: {
									name: chunk[csvColumn.frenchTranslator],
									slug: slug(frenchTranslatorRomaji),
								},
							},
							spanish: {
								content: chunk[csvColumn.spanishLyrics],
								creator: {
									name: chunk[csvColumn.spanishTranslator],
									slug: slug(spanishTranslatorRomaji),
								},
							},
						},
					})
				})()
				promises.push(promise)
			})
			.on('error', rej)
			.on('end', async () => {
				await Promise.all(promises)
				res(data)
			})
	})
}
async function main() {
	const payload = await payloadParse()
	await prisma.$transaction(async (tx) => {
		await Promise.all(
			payload.map(async (item) => {
				const song = await tx.song.upsert({
					where: {
						slug: item.songSlug,
					},
					update: {},
					create: {
						name: item.songName,
						slug: item.songSlug,
						trackNo: item.trackNo,
						youtubeId: item.youtubeLink,
						Album: {
							connectOrCreate: {
								where: { slug: item.album.slug },
								create: {
									name: item.album.name,
									imageUrl: item.album.imageUrl,
									releaseYear: item.album.releaseYear,
									slug: item.album.slug,
									totalTrack: item.album.totalTracks,
									Circle: {
										connectOrCreate: {
											where: { slug: item.album.circle.slug },
											create: {
												name: item.album.circle.name,
												role: 'circle',
												slug: item.album.circle.slug,
											},
										},
									},
								},
							},
						},
						Composer: {
							connectOrCreate: {
								where: { slug: item.artist.slug },
								create: {
									name: item.artist.name,
									role: 'composer',
									slug: item.artist.slug,
								},
							},
						},
						Vocals: {
							connectOrCreate: item.vocals.map((vocal) => ({
								where: { slug: vocal.slug },
								create: {
									name: vocal.name,
									role: 'vocalist',
									slug: vocal.slug,
								},
							})),
						},
					},
				})

				// Add Lyrics for each language
				await Promise.all(
					Object.entries(item.lyrics).map(async ([language, lyricData]) => {
						if (lyricData.content && isLanguage(language)) {
							await tx.lyrics.upsert({
								where: { language_songId: { language, songId: song.id } },
								update: {},
								create: {
									Song: { connect: { id: song.id } },
									content: lyricData.content,
									language: language,
									createdBy: {
										connectOrCreate: {
											where: { slug: lyricData.creator.slug },
											create: {
												name: lyricData.creator.name,
												role:
													language === 'japanese' || language === 'romaji'
														? 'lyricist'
														: 'translator',
												slug: lyricData.creator.slug,
											},
										},
									},
								},
							})
						}
					}),
				)
			}),
		)
	})
}

main().catch(console.error)
