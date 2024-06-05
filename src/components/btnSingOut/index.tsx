/** @format */

'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function BtnSignOut({ isOpened }: { isOpened: string }) {
	return (
		<Button
			variant={'destructive'}
			className='w-fit gap-4'
			onClick={() => signOut({ callbackUrl: '/login' })}>
			{isOpened == 'true' ? <p>Sair</p> : null}
			<LogOut size={20} />
		</Button>
	);
}
