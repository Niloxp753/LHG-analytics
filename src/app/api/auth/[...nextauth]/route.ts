/** @format */

import { getAllUserByEmailAction } from '@/actions/getUserByEmail';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

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
				const user = await getAllUserByEmailAction(credentials?.email!);

				const isvalidPass = bcrypt.compare(
					credentials?.password!,
					user.password,
				);

				if (!isvalidPass) {
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
			if(user){
				token.email = user.email,
				token.name = user.name
			}
			return token
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					name: token.name,
					email: token.email,
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
