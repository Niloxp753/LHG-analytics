/** @format */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'E-mail',
					type: 'email',
				},
				password: {
					label: 'Senha',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				const user = {
					id: '1',
					name: 'David',
					email: 'thiago@lhgmoteis.com.br',
					password: '123456789',
					role: 'admin',
				};

				const isValidEmail = user.email === credentials?.email;
				const isValidPassword = user.password === credentials?.password;
				if (!isValidEmail || !isValidPassword) {
					// Any object returned will be saved in `user` property of the JWT
					return null;
				}
				// If you return null then an error will be displayed advising the user to check their details.
				return user;

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
		// ...add more providers here
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			const customUser = user as unknown as any;
			if (user) {
				return {
					...token,
					role: customUser.role,
				};
			}
			return token;
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					name: token.name,
					email: token.email,
					role: token.role,
				},
			};
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
});

export { handler as GET, handler as POST };
