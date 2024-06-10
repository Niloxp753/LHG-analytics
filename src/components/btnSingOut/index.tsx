/** @format */

'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function BtnSignOut({ isOpened }: { isOpened: string }) {
	const [loading, setLoading] = useState(false);

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		setLoading(true);
		e.preventDefault();
		e.stopPropagation();
		try {
			signOut({ callbackUrl: '/login' });
		} catch (error) {
			alert(error);
		}
	}
	return (
		<Button
			disabled={loading}
			variant={`${loading ? 'default' : 'destructive'}`}
			className='flex w-full gap-3 p-2.5 disabled:grayscale disabled:border-zinc-100/40 disabled:hover:grayscale border bg-zinc-900'
			onClick={(e) => handleClick(e)}>
			{loading ? (
				<span className='bg-transparent h-6 w-6 border-l border-t border-zinc-50 rounded-full animate-spin' />
			) : isOpened == 'true' ? (
				<>
					<p>Sair</p>
					<LogOut size={20} />
				</>
			) : (
				<LogOut size={20} />
			)}
		</Button>
	);
}
