/** @format */

'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function BtnSignOut({isOpened}:{isOpened:boolean}) {
	return (
		<Button
			variant={'destructive'}
			className='text-lg w-fit gap-4'
			onClick={() => signOut({ callbackUrl: '/login' })}>
			{isOpened! ? <p>Sair</p> : null}
			<LogOut />
		</Button>
	);
}
