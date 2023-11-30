import { $Enums } from '@prisma/client'
type Code = 'JP' | 'EN' | 'SP' | 'FR'
export const languageCode = new Map<$Enums.Language, Code>([
	['japanese', 'JP'],
	['english', 'EN'],
	['french', 'FR'],
	['spanish', 'SP'],
])
