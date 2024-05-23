/** @format */

import BtnSignOut from '@/components/btnSingOut';
import Sidebar from '@/components/sidebar';

export default async function Home() {
	return (
		<main className='flex h-screen w-full items-center gap-10 flex-col justify-center bg-zinc-950'>
			<Sidebar />
			<div className='w-full h-screen text-white flex items-center justify-center'>
				{' '}
				<h2 className='text-center text-4xl'>DASHBOARD PRIVADO</h2>
			</div>
		</main>
	);
}
