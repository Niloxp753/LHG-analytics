/** @format */

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Loader2,
	MoreHorizontal,
	UserMinus,
	UserRoundCog,
	X,
} from 'lucide-react';
import { useState } from 'react';

import { deleteUserAction } from '@/actions/deleteUser';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from '@/components/ui/dialog';
import type { UpdateUserInput, User } from '@/types/user';
import { toast } from 'sonner';
import FormUpdate from './formUpdate';

export default function ColumnActions({ user }: { user: UpdateUserInput | User }) {
	const [openDrop, setOpenDrop] = useState(false);
	const [openDialogEdit, setOpenDialogEdit] = useState(false);
	const [openDialogDel, setOpenDialogDel] = useState(false);
	const [pending, setPending] = useState(false);

	async function handleDelete(user: User | UpdateUserInput) {
		setPending(true);
		try {
			await deleteUserAction(user.id!);
			toast.success('Usuário Deletado - 200', {
				description: `Usuário ${user.name} foi deletado`,
			});
			setOpenDialogDel(false);
			setOpenDrop(false);
		} catch (error) {
			toast.error('Algo deu errado, tente novamente - 500', {
				description: `Usuário ${user.name} não foi deletado`,
			});
			console.log(error);
		}
		setPending(false);
	}
	return (
		<>
			<DropdownMenu open={openDrop}>
				<DropdownMenuTrigger
					asChild
					onClick={() => setOpenDrop(true)}>
					<Button className='h-8 w-8 p-0 bg-zinc-800'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align='end'
					className='dark '>
					<DropdownMenuLabel
						onClick={() => setOpenDrop(false)}
						className='text-zinc-50 font-bold text-lg flex items-center justify-between'>
						Menu
						<X className='size-5 cursor-pointer hover:scale-125 duration-200 ease-linear' />
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						asChild
						className='cursor-pointer'>
						<Button
							onClick={() => (setOpenDialogEdit(true), setOpenDrop(false))}
							type='button'
							variant={'ghost'}
							className='font-semibold flex gap-3 items-center w-full'>
							Editar <UserRoundCog size={20} />
						</Button>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className='cursor-pointer hover:bg-red-800'
						onClick={() => (setOpenDrop(false), setOpenDialogDel(true))}
						asChild>
						<Button
							variant={'destructive'}
							className='hover:bg-red-800 font-semibold flex gap-3 items-center w-full'>
							Deletar
							<UserMinus size={20} />
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openDialogEdit}>
				<DialogContent className='dark text-zinc-100 sm:max-w-[425px] max-w-sm'>
					<DialogHeader>
						<DialogClose
							onClick={() => setOpenDialogEdit(false)}
							className=' ml-auto text-zinc-500 hover:text-zinc-100 duration-300 transition-all ease-linear'>
							<X />
						</DialogClose>
						<DialogTitle className='text-xl'>Editar Usuário</DialogTitle>
						<DialogDescription className='text-zinc-400 text-balance text-xs'>
							Preencha os campos para atualizar usuário já existente
						</DialogDescription>
					</DialogHeader>
					<FormUpdate user={user} />
				</DialogContent>
				<DialogOverlay onClick={() => setOpenDialogEdit(false)} />
			</Dialog>

			<Dialog open={openDialogDel}>
				<DialogContent className='dark'>
					<DialogHeader>
						<DialogClose
							onClick={() => setOpenDialogDel(false)}
							className=' ml-auto text-zinc-500 hover:text-zinc-100 duration-300 transition-all ease-linear'>
							<X />
						</DialogClose>
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
				<DialogOverlay onClick={() => setOpenDialogDel(false)} />
			</Dialog>
		</>
	);
}
