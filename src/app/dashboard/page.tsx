/** @format */
import { getServerSession } from 'next-auth';

import BtnSignOut from '@/components/btnSingOut';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();

	
	if (!session?.user) {
		redirect('/login');
	} else {
		return (
			<main className='flex h-screen w-full items-center gap-10 flex-col justify-center'>
				Página privada
				{session?.user?.email}
				<BtnSignOut />
			</main>
		);
	}
}
