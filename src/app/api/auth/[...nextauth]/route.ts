/** @format */

import { api } from '@/http/api-client';
import { User } from '@/http/user/getUsers';
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
				const users: User[] | any = await api
					.get(`users/all`, { next: { tags: ['users'] } })
					.json();
				const user = users?.find((u: User) => u.email === credentials?.email);

				if (user) {
					const isvalidPass = await bcrypt.compare(
						credentials?.password!,
						user.password!,
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
		}),
		// ...add more providers here
	],
	callbacks: {
		jwt: async ({ token, user, session, account, profile }) => {
			if (user) {
				return {
					...token,
					...user,
					...session,
					...account,
					...profile,
				};
			}
			return token;
		},
		session: async ({ session, token, newSession, user }) => {
			return {
				...token,
				...user,
				...session,
				...newSession,
			};
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
});

export { handler as GET, handler as POST };
