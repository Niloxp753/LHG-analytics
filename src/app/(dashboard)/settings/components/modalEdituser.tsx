/** @format */

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { IUserUp } from '@/http/user/updateUser';
import { UserRoundCog, X } from 'lucide-react';
import FormUpdate from './formUpdate';
import * as DialogRadix from '@radix-ui/react-dialog'

interface ModalUpdateProps {
	user: IUserUp;
}

export default function ModalEditUser({ user }: ModalUpdateProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'ghost'}
					className='font-semibold flex gap-3 items-center w-full'>
					Editar <UserRoundCog size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-zinc-950 text-zinc-100 max-w-sm rounded-md'>
				<DialogClose className=' ml-auto text-zinc-500 hover:text-zinc-100 duration-300 transition-all ease-linear'>
					<X />
				</DialogClose>
				<DialogHeader>
					<DialogTitle className='text-xl'>Editar Usuário</DialogTitle>
					<DialogDescription className='text-zinc-400 text-balance text-xs'>
						Preencha os campos para atualizar usuário já existente
					</DialogDescription>
				</DialogHeader>
				<FormUpdate user={user} />
			</DialogContent>
		</Dialog>
	);
}
