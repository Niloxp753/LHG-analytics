/** @format */

import React from 'react';
import { ModalCreateUser } from './ModalCreateUser';
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react';

export default function MenuOptions() {
	return (
		<div className='flex gap-5 items-center justify-center ml-auto pb-5'>
			<ModalCreateUser />
			<Button className='flex gap-4 w-fit text-zinc-800 font-semibold bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear'>
				Editar Usuário <Pencil size={20} />
			</Button>
			<Button
				variant={'destructive'}
				className='hover:bg-red-800 font-semibold flex gap-3 items-center'>
				Deletar Usuário
				<Trash2 size={20} />
			</Button>
		</div>
	);
}
