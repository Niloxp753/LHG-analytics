/** @format */

'use client';

import { useSessionStore } from '@/stores/session-store';

export default function WelcomeMessage() {
	const status = useSessionStore((s) => s.status);
	const name = useSessionStore((s) => s.user?.name);

	const displayName =
		status === 'loading' || status === 'idle' ? 'Carregando...' : name ?? '';

	return (
		<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center md:text-start pt-1.5 px-3'>
			Bem Vindo - <span className='text-violet-400'>{displayName}</span>
		</h2>
	);
}
