/** @format */

'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/_components/ui/button';
import { Loader2, LogOut } from 'lucide-react';

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
			className='flex w-full gap-3 text-red-600 p-2.5 disabled:grayscale disabled:border-zinc-100/40 disabled:hover:grayscale border bg-transparent hover:text-zinc-100'
			onClick={(e) => handleClick(e)}>
			{loading ? (
				<Loader2 className='size-5 animate-spin' />
			) : isOpened === 'true' ? (
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
