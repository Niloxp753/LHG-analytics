'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardSessionUnavailable() {
	const router = useRouter();

	return (
		<section
			aria-live='polite'
			className='fixed inset-x-4 top-24 z-[60] mx-auto max-w-xl rounded-lg border border-zinc-700 bg-zinc-900 p-5 text-center text-zinc-100 shadow-xl'
			role='alert'>
			<h2 className='text-lg font-semibold'>
				Sessão temporariamente indisponível
			</h2>
			<p className='mt-2 text-sm text-zinc-300'>
				Não foi possível validar sua sessão agora. Tente novamente em instantes.
			</p>
			<Button
				className='mt-4 bg-violet-400 text-zinc-950 hover:bg-violet-500'
				onClick={() => router.refresh()}>
				Tentar novamente
			</Button>
		</section>
	);
}
