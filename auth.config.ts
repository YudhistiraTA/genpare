import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: 'cms/login',
	},
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isOnCMS = nextUrl.pathname.startsWith('/cms')
			const isOnCMSLogin = nextUrl.pathname === '/cms/login'

			if (isOnCMS) {
				if (isOnCMSLogin) {
					if (isLoggedIn) {
						// Redirect to cms/ if user is already logged in and tries to access cms/login
						return Response.redirect(new URL('/cms', nextUrl))
					}
					// Allow users to enter cms/login while not logged in
					return true
				}
				if (isLoggedIn) return true
				return false
			}
			return true
		},
	},
}
