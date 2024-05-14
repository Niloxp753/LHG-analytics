/** @format */

import BtnSignOut from '@/components/btnSingOut';

export default async function Home() {
	return (
		<main className='flex h-screen w-full items-center gap-10 flex-col justify-center'>
			Página privada
			<BtnSignOut />
		</main>
	);
}
