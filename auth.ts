import NextAuth, { User } from 'next-auth'
import { authConfig } from './auth.config'
import credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { compare } from 'bcrypt'

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		credentials({
			authorize: async (credentials) => {
				const parsedCredentials = z
					.object({ key: z.string().min(1) })
					.safeParse(credentials)
				if (parsedCredentials.success) {
					const match = await compare(
						parsedCredentials.data.key,
						process.env.CMS_KEY as string,
					)
					if (match) return { id: 'hase' } as User
				}
				return null
			},
		}),
	],
})
