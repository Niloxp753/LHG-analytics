/** @format */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/http/api-client';
import * as bcrypt from 'bcrypt';
import { User } from '@/http/user/getUsers';

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Senha', type: 'password' },
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
							cpf: user.cpf, // Add the missing cpf property
						};
					}
				}
				return null;
				// If you return null then an error will be displayed advising the user to check their details.

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.cpf = user.cpf;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					name: token.name!,
					email: token.email!,
					cpf: token.cpf as string,
					role: token.role as string,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
		signOut: '/login',
	},
};
