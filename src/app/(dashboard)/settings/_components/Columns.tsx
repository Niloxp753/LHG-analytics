/** @format */
'use client';

import { Button } from '@/_components/ui/button';
import { IUser } from '@/_http/user/createUser';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import ColumnActions from './ColumnActions';

export const columns: ColumnDef<IUser | undefined | any>[] = [
	{
		id: 'Cargo',
		accessorKey: 'role',
		header: 'Cargo',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('Cargo')}</div>
		),
	},
	{
		id: 'Nome',
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
			<div className='font-medium text-zinc-50'>{row.getValue('Nome')}</div>
		),
	},
	{
		id: 'CPF',
		accessorKey: 'cpf',
		header: 'CPF',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('CPF')}</div>,
	},
	{
		id: 'Unidade',
		accessorKey: 'companyName',
		header: 'Unidade',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('Unidade')}</div>
		),
	},
	{
		id: 'Email',
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
		cell: ({ row }) => <div className='lowercase'>{row.getValue('Email')}</div>,
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
