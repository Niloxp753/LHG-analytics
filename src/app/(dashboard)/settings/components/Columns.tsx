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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import ModalDelete from './modalDelete';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '@/http/user/createUser';

export const columns: ColumnDef<IUser | undefined | any>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				className='border-zinc-50'
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Selecionar Tudo'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Selecionar Linha'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'role',
		header: 'Status',
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

			// function handleCopy(payment: User) {
			// 	return toast.success('Dados Copiados - 200', {
			// 		description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
			// 	});
			// }

			// function handleUpdate(payment: User) {
			// 	return toast.success('Dados Alterados - 200', {
			// 		description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
			// 	});
			// }

			// function handleInactive(payment: User) {
			// 	return toast.success(' - 200', {
			// 		description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
			// 	});
			// }

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='default'
							className='h-8 w-8 p-0 bg-zinc-800'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='dark'>
						<DropdownMenuLabel className='text-zinc-50 font-bold text-lg'>
							Menu
						</DropdownMenuLabel>
						<DropdownMenuItem className='cursor-pointer'>
							Copiar dados
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='cursor-pointer'>
							Editar Usuário
						</DropdownMenuItem>
						<ModalDelete user={user} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
