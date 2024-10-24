/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import * as bcrypt from 'bcrypt';
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
				const users = await getAllUsersAction();
				const user = users.find((u) => u.email === credentials?.email);

				if (user) {
					const isvalidPass = await bcrypt.compare(
						credentials?.password!,
						user.password,
					);

					if (!isvalidPass) {
						// Any object returned will be saved in `user` property of the JWT
						return null;
					} else {
						return user;
					}
				}

				return null;

				// If you return null then an error will be displayed advising the user to check their details.

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
			type: 'credentials',
		}),
		// ...add more providers here
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				return { ...(token = { email: user.email, name: user.name }) };
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				return {
					...session,
					user: {
						name: token.name,
						email: token.email,
					},
				};
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
});

export { handler as GET, handler as POST };
