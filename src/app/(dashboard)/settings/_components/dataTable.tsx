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
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

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
import { ChevronDown, Search } from 'lucide-react';
import * as React from 'react';
import { columns } from './Columns';
import { ModalCreateUser } from './ModalCreateUser';
import { User } from '@/types/user';

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export function DataTableDemo({ data }: { data: User[] }) {
	// const data = await getAllUsersAction();

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	// eslint-disable-next-line react-hooks/incompatible-library
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
		initialState: {
			pagination: {
				pageSize: 25,
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	const pageIndex = table.getState().pagination.pageIndex;
	const pageCount = table.getPageCount();
	const pageSize = table.getState().pagination.pageSize;
	const canPrevious = table.getCanPreviousPage();
	const canNext = table.getCanNextPage();
	const currentPage = pageIndex + 1;
	const pageItems: Array<number | 'ellipsis'> = React.useMemo(() => {
		if (pageCount <= 5) {
			return Array.from({ length: pageCount }, (_, index) => index + 1);
		}

		if (currentPage <= 3) {
			return [1, 2, 3, 4, 'ellipsis', pageCount];
		}

		if (currentPage >= pageCount - 2) {
			return [
				1,
				'ellipsis',
				pageCount - 3,
				pageCount - 2,
				pageCount - 1,
				pageCount,
			];
		}

		return [
			1,
			'ellipsis',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'ellipsis',
			pageCount,
		];
	}, [currentPage, pageCount]);

	return (
		<div className='w-full mx-auto md:pr-10 px-3'>
			<div className='flex items-center py-4 flex-col md:flex-row gap-5 mx-auto w-full'>
				<div className='flex items-center w-full md:w-fit justify-start bg-zinc-50 rounded pl-2 '>
					<Search
						className='text-zinc-800'
						size={24}
					/>
					<span className='h-5 w-[1.5px] mx-1.5 rounded-full  bg-zinc-600/40'></span>
					<Input
						placeholder='Procure pelo nome'
						value={(table.getColumn('Nome')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('Nome')?.setFilterValue(event.target.value)
						}
						className='md:max-w-sm h-fit border-none outline-none ring-0 focus-within:ring-0 text-zinc-950 bg-transparent'></Input>
				</div>
				<div className='flex items-center justify-between md:justify-start  md:ml-auto md:flex-row mx-auto w-full gap-3'>
					<ModalCreateUser />
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
										<TableCell
											className='text-nowrap'
											key={cell.id}>
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
			<div className='flex items-center justify-between gap-4 py-4'>
				<div className='flex items-center gap-3 text-sm text-zinc-200'>
					<span className='text-nowrap'>Linhas por página</span>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}>
						<SelectTrigger className='h-9 w-[90px] bg-zinc-900'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{PAGE_SIZE_OPTIONS.map((size) => (
								<SelectItem
									key={size}
									value={String(size)}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Pagination className='justify-end dark text-white'>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href='#'
								aria-disabled={!canPrevious}
								tabIndex={canPrevious ? 0 : -1}
								className={
									canPrevious ? undefined : 'pointer-events-none opacity-50'
								}
								onClick={(event) => {
									event.preventDefault();
									if (canPrevious) {
										table.previousPage();
									}
								}}
							/>
						</PaginationItem>
						{pageItems.map((item, index) => (
							<PaginationItem key={`${item}-${index}`}>
								{item === 'ellipsis' ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										href='#'
										isActive={item === currentPage}
										onClick={(event) => {
											event.preventDefault();
											table.setPageIndex(item - 1);
										}}>
										{item}
									</PaginationLink>
								)}
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								href='#'
								aria-disabled={!canNext}
								tabIndex={canNext ? 0 : -1}
								className={
									canNext ? undefined : 'pointer-events-none opacity-50'
								}
								onClick={(event) => {
									event.preventDefault();
									if (canNext) {
										table.nextPage();
									}
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
