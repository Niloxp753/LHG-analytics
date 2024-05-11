/** @format */

import capaLogin from '@/assets/images/capa-login.png';
import logo from '@/assets/images/logo-lush.png';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import FormLogin from './formLogin';
import Link from 'next/link';

export default function Login() {
	return (
		<div className='w-full flex h-screen bg-zinc-950 overflow-hidden'>
			<div className='hidden bg-zinc-800 lg:flex relative lg:w-2/3 h-full '>
				<a
					href='/'
					className='mx-auto h-fit  mt-20 z-50'>
					<Image
						src={logo}
						width={340}
						height={80}
						alt='Logo Lush Motéis'></Image>
				</a>
				<Image
					src={capaLogin}
					alt='Image'
					width='1800'
					height='900'
					className='h-full w-full object-cover grayscale absolute left-0 top-0'
				/>
			</div>
			<div className='flex items-center gap-10 flex-col justify-center w-full lg:w-1/3'>
				<Image
					className='lg:hidden'
					src={logo}
					width={140}
					height={80}
					alt='Logo Lush Motéis'></Image>
				<Card className='mx-auto grid w-[348px] gap-6 border-purple-300 bg-zinc-800 p-4'>
					<div className='grid gap-3 text-center'>
						<h1 className='text-3xl font-bold text-zinc-50'>Login</h1>
						<p className='text-balance text-zinc-200 text-sm'>
							Entre com seus dados abaixo para fazer login
						</p>
					</div>

					<FormLogin />
				</Card>
			</div>
		</div>
	);
}
