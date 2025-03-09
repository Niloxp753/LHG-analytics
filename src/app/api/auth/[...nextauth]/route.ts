/** @format */

import { api } from '@/http/api-client';
import { User } from '@/http/user/getUsers';
import * as bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
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
			async authorize(credentials) {
				const user: User | any = await api
					.get(`users/email/${credentials?.email}`, {
						next: { tags: ['user'] },
					})
					.json();

				if (user) {
					const isvalidPass = await bcrypt.compare(
						credentials?.password!,
						user.password!,
					);

					if (!isvalidPass) {
						// Any object returned will be saved in `user` property of the JWT
						return null;
					} else {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role, // Inclua apenas dados primitivos!
						};
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
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				// token.role = user.role;
				return token;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user = {
					name: token.name,
					email: token.email,
				};
				return session;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
		signOut: '/login',
	},
});

export { handler as GET, handler as POST };
