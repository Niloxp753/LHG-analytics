/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
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
import { IUser } from '@/http/user/createUser';
import {
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
import { ChevronDown, Search, UserRoundCog } from 'lucide-react';
import * as React from 'react';
import { columns } from './Columns';
import { ModalCreateUser } from './ModalCreateUser';

export function DataTableDemo({ data }: { data: IUser[] }) {
	// const data = await getAllUsersAction();

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
		<div className='w-full mx-auto md:pr-10 px-3'>
			<div className='flex items-center py-4 flex-col md:flex-row gap-5 mx-auto w-full'>
				<div className='flex items-center w-full justify-start bg-zinc-50 rounded pl-2 '>
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
				<div className='flex items-center justify-between md:justify-start  md:ml-auto md:flex-row mx-auto w-full gap-3'>
					<ModalCreateUser />
					<Button className='flex gap-3 items-center font-semibold bg-zinc-900 border border-border hover:bg-zinc-700'>
						Editar <UserRoundCog size={20} />
					</Button>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='default'
							className='ml-auto'>
							Colunas <ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='dark'>
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
			<div className='rounded-md w-full'>
				<Table className='bg-zinc-900 w-full mr-auto text-zinc-100'>
					<TableHeader className='bg-violet-900 hover:bg-violet-900'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								className='hover:bg-violet-900 bg-violet-900'
								key={headerGroup.id}>
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
