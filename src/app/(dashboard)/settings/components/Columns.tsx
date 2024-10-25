/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IUser } from '@/http/user/createUser';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, UserRoundCog, X } from 'lucide-react';
import ModalDelete from './modalDelete';
import ModalEditUser from './modalEdituser';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import FormUpdate from './formUpdate';

export const columns: ColumnDef<IUser | undefined | any>[] = [
	{
		accessorKey: 'role',
		header: 'Cargo',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('role')}</div>,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='default'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Nome
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='font-medium text-zinc-50'>{row.getValue('name')}</div>
		),
	},
	{
		accessorKey: 'cpf',
		header: 'CPF',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('cpf')}</div>,
	},
	{
		accessorKey: 'companyName',
		header: 'Unidade',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('companyName')}</div>
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='default'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
	},

	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className='h-8 w-8 p-0 bg-zinc-800'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						aria-activedescendant=''
						align='end'
						className='dark '>
						<DropdownMenuLabel className='text-zinc-50 font-bold text-lg'>
							Menu
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<Button
									type='button'
									variant={'ghost'}
									className='font-semibold flex gap-3 items-center w-full'>
									Editar <UserRoundCog size={20} />
								</Button>
							</DropdownMenuSubTrigger>
							<DropdownMenuContent className='dark px-8 py-4'>
								<Dialog>
									<DialogTitle className='text-xl'>Editar Usuário</DialogTitle>
									<DialogDescription className='text-zinc-400 text-balance text-xs'>
										Preencha os campos para atualizar usuário já existente
									</DialogDescription>
									<FormUpdate user={user} />
								</Dialog>
							</DropdownMenuContent>
						</DropdownMenuSub>

						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<ModalDelete user={user} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
