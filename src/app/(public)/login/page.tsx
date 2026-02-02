/** @format */

import capaLogin from '@/assets/images/capa-login.png';
import logo from '@/assets/images/logo-analytics.png';
import logoLush from '@/assets/images/logo-lush.png';
import logoTout from '@/assets/images/logo_tout.png';
import logoAC from '@/assets/images/logo_andar_de_cima.png';
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
					<Image
						src={logo}
						width={280}
						height={80}
						alt='Logo LHG Analytics'></Image>
				</a>
				<Image
					src={capaLogin}
					alt='Image'
					width='1400'
					height='700'
					className='h-full w-full object-cover grayscale absolute left-0 top-0 opacity-30'
				/>
				<div className='flex mx-auto items-end justify-center gap-10 w-fit mb-60 z-50'>
					<Image
						src={logoLush}
						alt='Image'
						width={120}
						height={60}
					/>
					<Image
						src={logoTout}
						alt='Image'
						width={120}
						height={60}
					/>
					<Image
						src={logoAC}
						alt='Image'
						width={220}
						height={110}
					/>
					<Image
						src='/logo_liv.png'
						alt='Image'
						width={102}
						height={30}
					/>
				</div>
			</div>
			<div className='flex items-center gap-10 flex-col justify-center w-full lg:w-1/3'>
				<Image
					className='lg:hidden'
					src={logo}
					width={140}
					height={80}
					alt='Logo LHG Analytics'></Image>
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
