/** @format */

'use client';

import { deleteUserAction } from '@/actions/deleteUser';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { IUser } from '@/http/user/createUser';
import { Loader2, UserMinus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ModalDeleteProps {
	user: IUser;
}

export default function ModalDelete({ user }: ModalDeleteProps) {
	const [pending, setPending] = useState(false);

	async function handleDelete(user: IUser) {
		setPending(true);
		try {
			await deleteUserAction(user.id!);
			toast.success('Usuário Deletado - 200', {
				description: `Usuário ${user.name} foi deletado`,
			});
		} catch (error) {
			toast.error('Algo deu errado, tente novamente - 500', {
				description: `Usuário ${user.name} não foi deletado`,
			});
			console.log(error);
		}
		setPending(false);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'destructive'}
					className='hover:bg-red-800 font-semibold flex gap-3 items-center w-full'>
					Deletar
					<UserMinus size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className='dark'>
				<DialogHeader>
					<DialogTitle className='text-zinc-100'>Confirmação</DialogTitle>
					<DialogDescription>
						Os dados excluídos não serão recuperados. Tem certeza que deseja
						deletar o usuário?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						onClick={() => handleDelete(user)}
						disabled={pending}
						variant={'destructive'}
						className='hover:bg-red-800 font-semibold w-full'>
						{pending ? (
							<Loader2 className='size-4 animate-spin' />
						) : (
							'Deletar Permanentemente'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
