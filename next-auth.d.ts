/** @format */

// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// 1. Estende o objeto `session.user`
declare module 'next-auth' {
	interface Session {
		user: {
			/** Propriedades padrão de user do NextAuth */
			name?: string | null;
			email?: string | null;
			image?: string | null;
		} & {
			/** Nossos campos extras */
			cpf: string;
			role: string;
		};
	}

	// 2. Estende a interface `User` (no callback `jwt`, `user` terá esses campos)
	interface User extends DefaultUser {
		cpf: string;
		role: string;
	}
}

// 3. Estende o token JWT para incluir `cpf` e `role`
declare module 'next-auth/jwt' {
	interface JWT {
		/** Esses campos surgem do callback `jwt` */
		cpf?: string;
		role?: string;
	}
}
