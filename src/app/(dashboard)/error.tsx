'use client';

import { Button } from '@/components/ui/button';

type DashboardErrorProps = {
	retry: () => void;
};

export default function DashboardError({ retry }: DashboardErrorProps) {
	return (
		<main className='flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100'>
			<section
				className='w-full max-w-lg rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-center'
				role='alert'>
				<h1 className='text-xl font-semibold'>
					Sessão temporariamente indisponível
				</h1>
				<p className='mt-2 text-sm text-zinc-300'>
					Não foi possível concluir esta solicitação. Tente novamente em instantes.
				</p>
				<Button
					className='mt-5 bg-violet-400 text-zinc-950 hover:bg-violet-500'
					onClick={retry}>
					Tentar novamente
				</Button>
			</section>
		</main>
	);
}
