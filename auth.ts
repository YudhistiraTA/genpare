'use server'
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
						'$2a$16$87tQBJseG7Iz6u871GvhWOr7b5u8qQWD9bkzdHe8F4wGtXkd9Lm8S',
					)
					if (match) return { id: 'hase' } as User
				}
				return null
			},
		}),
	],
})
