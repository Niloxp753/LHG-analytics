/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	ArrowUpDown,
	ChevronDown,
	MoreHorizontal,
	Pencil,
	Search,
	Trash2,
} from 'lucide-react';
import * as React from 'react';
import { ModalCreateUser } from './ModalCreateUser';

const data: User[] = [
	{
		id: 'm5gr84i9',
		name: 'João Silva',
		CPF: '00000000000',
		password: '123456789',
		status: 'inativo',
		email: 'ken99@yahoo.com',
	},
	{
		id: '3u1reuv4',
		name: 'Maria Oliveira',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'Abe45@gmail.com',
	},
	{
		id: 'derv1ws0',
		name: 'Pedro Santos',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'Monserrat44@gmail.com',
	},
	{
		id: '5kma53ae',
		name: 'Ana Costa',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'Silas22@gmail.com',
	},

	{
		id: '5kma53ae',
		name: 'Rafael Lima',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'Silas22@gmail.com',
	},
	{
		id: '5kma53ae',
		name: 'Beatriz Sousa',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'Silas22@gmail.com',
	},
	{
		id: 'bhqecj4p',
		name: 'Felipe Carvalho',
		CPF: '00000000000',
		password: '123456789',
		status: 'ativo',
		email: 'carmella@hotmail.com',
	},
];

export type User = {
	id: string;
	name: string;
	status?: 'ativo' | 'inativo';
	CPF?: string;
	email: string;
	password?: string;
};

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('status')}</div>
		),
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
		accessorKey: 'CPF',
		header: 'CPF',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('CPF')}</div>,
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
		accessorKey: 'password',
		header: 'Senha',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('password')}</div>
		),
	},

	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			function handleDelete(payment: User) {
				return toast.success('Usuário Deletado - 200', {
					description: `Usuário ${payment.name} será deletado`,
				});
			}

			function handleCopy(payment: User) {
				return toast.success('Dados Copiados - 200', {
					description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
				});
			}

			function handleUpdate(payment: User) {
				return toast.success('Dados Alterados - 200', {
					description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
				});
			}

			function handleInactive(payment: User) {
				return toast.success(' - 200', {
					description: `Dados de usuário ${payment.name} ${payment.password} ${payment.email} ${payment.CPF} ${payment.password} foram copiados`,
				});
			}

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
						className='bg-zinc-800 text-zinc-200'>
						<DropdownMenuLabel className='text-zinc-50 font-bold text-lg'>
							Menu
						</DropdownMenuLabel>
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={() => handleCopy(payment)}>
							Copiar dados
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='cursor-pointer'>
							Editar Usuário
						</DropdownMenuItem>
						<DropdownMenuItem className='cursor-pointer'>
							Inativar usuário
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleDelete(payment)}
							className='hover:bg-red-500 transition-all duration-300 ease-linear cursor-pointer font-semibold bg-red-800'>
							Deletar Usuário
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function DataTableDemo() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='w-full pr-10 '>
			<div className='flex items-center py-4'>
				<div className='flex items-center justify-start bg-zinc-50 rounded pl-2 '>
					<Search
						className='text-zinc-800'
						size={24}
					/>
					<span className='h-6 w-[1.5px] mx-1.5 rounded-full  bg-zinc-600/40'></span>
					<Input
						placeholder='Procure pelo nome'
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('name')?.setFilterValue(event.target.value)
						}
						className='max-w-sm border-none outline-none ring-0 focus-within:ring-0 text-zinc-950'></Input>
				</div>
				<div className='flex gap-5 items-center justify-center ml-auto'>
					<ModalCreateUser />
					<Button className='flex gap-3 items-center font-semibold bg-zinc-900 border hover:bg-zinc-700'>
						Editar Usuário <Pencil size={20} />
					</Button>
					<Button
						variant={'destructive'}
						className='hover:bg-red-800 font-semibold flex gap-3 items-center'>
						Deletar Usuário
						<Trash2 size={20} />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='default'
								className='ml-auto'>
								Colunas <ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className='rounded-md border'>
				<Table className='bg-zinc-900'>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									sem resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} de{' '}
					{table.getFilteredRowModel().rows.length} linha(s) selecionada.
				</div>
				<div className='space-x-2'>
					<Button
						variant='default'
						className='disabled:grayscale'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Anterior
					</Button>
					<Button
						variant='default'
						size='sm'
						className='disabled:grayscale'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Próximo
					</Button>
				</div>
			</div>
		</div>
	);
}
