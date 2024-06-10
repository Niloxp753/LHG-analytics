/** @format */

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import FormCreateUser from './FormCreateUser';

export function ModalCreateUser() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='ml-auto flex gap-4 w-fit text-zinc-800 font-semibold bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear'>
					Adicionar Usuário <UserPlus size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-zinc-800 text-zinc-100'>
				<DialogHeader>
					<DialogTitle>Cadastrar Usuário</DialogTitle>
					<DialogDescription className='text-zinc-400'>
						Preencha os campos para cadastrar um novo usuário
					</DialogDescription>
				</DialogHeader>
				<FormCreateUser />
			</DialogContent>
		</Dialog>
	);
}
