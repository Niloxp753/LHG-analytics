/** @format */
'use client';

import { Button } from '@/components/ui/button';
import { IUser } from '@/http/user/createUser';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import ColumnActions from './ColumnActions';

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

			return <ColumnActions user={user} />;
		},
	},
];
