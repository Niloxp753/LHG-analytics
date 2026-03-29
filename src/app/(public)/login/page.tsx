/** @format */

import capaLogin from '@/assets/images/capa-login.png';
import logo from '@/assets/images/logo-analytics.png';
import logoLush from '@/assets/images/logo-lush.png';
import logoTout from '@/assets/images/logo_tout.png';
import logoAC from '@/assets/images/logo_andar_de_cima.png';
import logoAltana from '@/assets/images/logo_altana.webp';
import { LogoImage } from '@/components/ui/logo-image';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Suspense } from 'react';
import FormLogin from './_components/formLogin';

export default function Login() {
	return (
		<div className='w-full flex h-screen bg-zinc-950 overflow-hidden'>
			<div className='hidden bg-zinc-800 lg:flex relative lg:w-2/3 h-full flex-col justify-between items-center'>
				<a
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
				</a>
				<Image
					src={capaLogin}
					alt='Image'
					width='1400'
					height='700'
					className='h-full w-full object-cover grayscale absolute left-0 top-0 opacity-30'
				/>
				<div className='flex mx-auto items-center justify-center gap-8 w-fit mb-60 z-50'>
					<LogoImage
						src={logoLush}
						alt='Logo Lush'
						boxWidth={120}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 120px'
					/>
					<LogoImage
						src={logoTout}
						alt='Logo Tout'
						boxWidth={120}
						boxHeight={60}
						sizes='(max-width: 1023px) 0px, 120px'
					/>
					<LogoImage
						src={logoAC}
						alt='Logo Andar de Cima'
						boxWidth={220}
						boxHeight={110}
						sizes='(max-width: 1023px) 0px, 220px'
					/>
					<LogoImage
						src='/logo_liv.png'
						alt='Logo LIV'
						boxWidth={102}
						boxHeight={30}
						sizes='(max-width: 1023px) 0px, 102px'
					/>
					<LogoImage
						src={logoAltana}
						alt='Logo Altana'
						boxWidth={60}
						boxHeight={44}
						sizes='(max-width: 1023px) 0px, 60px'
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
