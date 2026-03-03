/** @format */

'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut } from 'lucide-react';
import { logoutWithCookies } from '@/lib/auth-client';
import { useSessionStore } from '@/stores/session-store';

async function signOut({ callbackUrl }: { callbackUrl?: string } = {}) {
	await logoutWithCookies();
	useSessionStore.getState().clear();
	if (callbackUrl) {
		window.location.href = callbackUrl;
	}
}

export default function BtnSignOut({
	isOpened,
	fit,
}: {
	isOpened?: boolean;
	fit?: boolean;
}) {
	const [loading, setLoading] = useState(false);

	async function handleClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) {
		setLoading(true);
		e.preventDefault();
		e.stopPropagation();
		try {
			await signOut({ callbackUrl: '/login' });
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	}
	return (
		<Button
			disabled={loading}
			variant={'destructive'}
			className={`flex ${
				fit ? 'w-fit' : 'w-full'
			}  gap-3 text-red-600 hover:bg-transparent md:hover:bg-destructive hover:text-red-600 p-2.5 disabled:grayscale disabled:border-zinc-100/40 disabled:hover:grayscale bg-transparent md:hover:text-zinc-100 `}
			onClick={(e) => {
				void handleClick(e);
			}}>
			{loading ? (
				<Loader2 className='size-5 animate-spin' />
			) : isOpened ? (
				<>
					<p className=''>Sair</p>
					<LogOut size={16} />
				</>
			) : (
				<LogOut size={16} />
			)}
		</Button>
	);
}
