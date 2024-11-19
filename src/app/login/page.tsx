/** @format */

import capaLogin from '@/_assets/images/capa-login.png';
import logo from '@/_assets/images/logo-analytics.png';
import logoLush from '@/_assets/images/logo-lush.png';
import logoTout from '@/_assets/images/logo_tout.png';
import logoAC from '@/_assets/images/logo_andar_de_cima.png';
import { Card } from '@/_components/ui/card';
import Image from 'next/image';
import FormLogin from './_components/formLogin';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Login({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = 'general';
	const preSet = searchParams.set || '7days';

	const session = await getServerSession();

	if (session?.user) {
		redirect(`/general?menu=${menu}&open=${open}&set=${preSet}`);
	} else {
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
					<div className='flex mx-auto items-baseline justify-center gap-10 w-fit mb-60 z-50'>
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
					</div>
				</div>
				<div className='flex items-center gap-10 flex-col justify-center w-full lg:w-1/3'>
					<Image
						className='lg:hidden'
						src={logo}
						width={140}
						height={80}
						alt='Logo LHG Analytics'></Image>
					<Card className='mx-auto grid w-[320px] gap-5 border-zinc-600 bg-zinc-800 p-4'>
						<div className='grid gap-3 text-center'>
							<h1 className='text-3xl font-bold text-zinc-50'>Login</h1>
							<p className=' text-zinc-200 text-center text-balance'>
								Entre com seus dados abaixo para fazer login
							</p>
						</div>
						<FormLogin />
					</Card>
				</div>
			</div>
		);
	}
}
