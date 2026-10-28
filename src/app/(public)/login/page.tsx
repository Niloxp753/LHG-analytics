/** @format */

import capaLogin from '@/assets/images/capa-login.png';
import logo from '@/assets/images/logo-analytics.png';
import logoLush from '@/assets/images/logo-lush.png';
import logoTout from '@/assets/images/logo_tout.png';
import logoAC from '@/assets/images/logo_andar_de_cima.png';
import logoAltana from '@/assets/images/logo-altana-login.png';
import logoGetan from '@/assets/images/logo-getan-login.png';
import { LogoImage } from '@/components/ui/logo-image';
import { Card } from '@/components/ui/card';
import { getDefaultSessionHref } from '@/lib/session/default-route';
import { getOptionalSessionUser } from '@/lib/session/session-dal';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import FormLogin from './_components/formLogin';

export const instant = false;

type LoginPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Login({ searchParams }: LoginPageProps) {
	const params = await searchParams;
	const requestedSet = Array.isArray(params.set) ? params.set[0] : params.set;
	const user = await getOptionalSessionUser();
	if (user) {
		redirect(getDefaultSessionHref(user, requestedSet));
	}

	return (
		<div className='w-full flex h-screen bg-zinc-950 overflow-hidden'>
			<div className='hidden bg-zinc-800 lg:flex relative lg:w-2/3 h-full flex-col justify-between items-center'>
				<Link
					href='/'
					className='mx-auto h-fit  mt-20 z-50'>
					<LogoImage
						src={logo}
						boxWidth={280}
						boxHeight={80}
						sizes='(max-width: 1023px) 0px, 280px'
						priority
						alt='Logo LHG Analytics'
					/>
				</Link>
				<Image
					src={capaLogin}
					alt='Imagem de fundo da tela de login'
					width='1400'
					height='700'
					className='h-full w-full object-cover grayscale absolute left-0 top-0 opacity-30'
				/>
				<div className='flex mx-auto max-w-full items-center justify-center gap-4 px-6 xl:gap-6 2xl:gap-8 w-fit mb-60 z-50'>
					<LogoImage
						src={logoLush}
						alt='Logo Lush'
						containerClassName='min-w-0 shrink'
						boxWidth={108}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 108px'
					/>
					<LogoImage
						src={logoTout}
						alt='Logo Tout'
						containerClassName='min-w-0 shrink'
						boxWidth={94}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 94px'
					/>
					<LogoImage
						src={logoAC}
						alt='Logo Andar de Cima'
						containerClassName='min-w-0 shrink'
						boxWidth={248}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 248px'
					/>
					<LogoImage
						src='/logo_liv.png'
						alt='Logo LIV'
						containerClassName='min-w-0 shrink'
						boxWidth={88}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 88px'
					/>
					<LogoImage
						src={logoAltana}
						alt='Logo Altana'
						containerClassName='min-w-0 shrink'
						boxWidth={180}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 180px'
					/>
					<LogoImage
						src={logoGetan}
						alt='Logo Getan'
						containerClassName='min-w-0 shrink'
						boxWidth={144}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 144px'
					/>
				</div>
			</div>
			<div className='flex items-center gap-10 flex-col justify-center w-full lg:w-1/3'>
				<LogoImage
					containerClassName='lg:hidden'
					src={logo}
					boxWidth={140}
					boxHeight={80}
					sizes='(max-width: 1023px) 140px, 0px'
					alt='Logo LHG Analytics'
				/>
				<Card className='mx-auto grid md:w-[320px] gap-5 border-zinc-600 bg-zinc-800 p-4'>
					<div className='grid gap-3 text-center'>
						<h1 className='text-3xl font-bold text-zinc-50'>Login</h1>
						<p className=' text-zinc-200 text-center text-balance'>
							Entre com seus dados abaixo para fazer login
						</p>
					</div>
					<Suspense fallback={null}>
						<FormLogin />
					</Suspense>
				</Card>
			</div>
		</div>
	);
}
