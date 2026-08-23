'use client';

import { useSessionStore } from '@/stores/session-store';
import Link from 'next/link';

type SessionBootstrapProfileProbeProps = {
	nextHref: string;
	queryHref: string;
	serverProfileName: string;
};

export default function SessionBootstrapProfileProbe({
	nextHref,
	queryHref,
	serverProfileName,
}: SessionBootstrapProfileProbeProps) {
	const status = useSessionStore((state) => state.status);
	const user = useSessionStore((state) => state.user);

	return (
		<main className='min-h-screen bg-zinc-950 px-8 pt-32 text-zinc-100 lg:pl-56'>
			<p data-testid='server-profile-name'>{serverProfileName}</p>
			<p data-testid='session-profile-status'>{status}</p>
			<p data-testid='session-profile-name'>{user?.name ?? 'none'}</p>
			<p data-testid='session-profile-role'>{user?.role ?? 'none'}</p>
			<p data-testid='session-profile-unit'>{user?.unit ?? 'none'}</p>
			<Link
				className='mt-6 inline-block rounded bg-violet-400 px-4 py-2 text-zinc-950'
				href={nextHref}
				prefetch={false}>
				Ir para o segundo perfil
			</Link>
			<Link
				className='ml-4 mt-6 inline-block rounded border border-violet-400 px-4 py-2 text-violet-200'
				href={queryHref}
				prefetch={false}>
				Revalidar somente query
			</Link>
		</main>
	);
}
