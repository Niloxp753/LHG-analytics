/** @format */

import NextAuthProvider from '@/providers/nextAuthProvider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import logo from '@/assets/images/favcon.png';

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'LHG Analytics',
	description: 'Sistema de análise de dados interativo do Grupo LHG',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<link
				rel='shortcut icon'
				href={'/favcon.png'}
				type='image/x-icon'
			/>
			<body className={inter.className}>
				<NextAuthProvider>
					<Toaster
						richColors
						position='top-right'
					/>
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
