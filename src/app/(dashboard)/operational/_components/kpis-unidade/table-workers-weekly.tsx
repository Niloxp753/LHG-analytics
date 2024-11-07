/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';

export default function TableWokersWeekly() {
	const data = [
		{
			name: 'Manhã  04hrs - 12hrs',
			Sunday: 92.4,
			Monday: 78.3,
			Tuesday: 85.6,
			Wednesday: 102.7,
			Thursday: 110.2,
			Friday: 163.5,
			Saturday: 106.8,
		},
		{
			name: 'Tarde  12hrs - 20hrs',
			Sunday: 97.1,
			Monday: 66.8,
			Tuesday: 89.4,
			Wednesday: 99.3,
			Thursday: 112.5,
			Friday: 174.6,
			Saturday: 110.9,
		},
		{
			name: 'Noite  20hrs - 04hrs',
			Sunday: 98.5,
			Monday: 72.6,
			Tuesday: 84.3,
			Wednesday: 101.9,
			Thursday: 109.8,
			Friday: 169.1,
			Saturday: 112.7,
		},
	];

	const total = {
		Sunday: 97.8,
		Monday: 66.5,
		Tuesday: 86.5,
		Wednesday: 104,
		Thursday: 111.2,
		Friday: 168.3,
		Saturday: 108,
	};

	return (
		<div>
			<div className='flex flex-col gap-5 text-balance md:flex-row items-baseline justify-between text-zinc-50'>
				<h2 className='font-bold  text-3xl mt-10'>
					Dimensionamento de equipe - Semanal
				</h2>
				<p>
					Quadro aprovado de 20 camareiras:{' '}
					<span className='text-violet-400'>5 manhã / 8 tarde / 7 noite</span>
				</p>
				<div className='border rounded-lg p-5 flex items-center justify-center font-bold text-xl text-red-500'>
					Faltas: 16
				</div>
			</div>
			<Table
				title='Dimensionamento de equipe - Semanal'
				className='mt-5 bg-zinc-900 rounded-lg'>
				<TableHeader className='bg-violet-900 rounded-lg text-sm'>
					<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
						<TableHead>Horário</TableHead>
						<TableHead className='text-center text-xs '>Domingo</TableHead>
						<TableHead className='text-center text-xs '>
							Segunda-Feira
						</TableHead>
						<TableHead className='text-center text-xs'>Terça-Feira</TableHead>
						<TableHead className='text-center text-xs '>Quarta-Feira</TableHead>
						<TableHead className='text-center text-xs '>Quinta-Feira</TableHead>
						<TableHead className='text-center text-xs'>Sexta-Feira</TableHead>
						<TableHead className='text-center text-xs '>Sábado</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='text-zinc-100'>
					{data.map((invoice, index) => (
						<TableRow
							key={index}
							className='text-center'>
							<TableCell className='font-bold text-left'>
								{invoice.name}
							</TableCell>
							<TableCell>{invoice.Sunday}</TableCell>
							<TableCell>{invoice.Monday}</TableCell>
							<TableCell>{invoice.Tuesday}</TableCell>
							<TableCell>{invoice.Thursday}</TableCell>
							<TableCell>{invoice.Wednesday}</TableCell>
							<TableCell>{invoice.Friday}</TableCell>
							<TableCell>{invoice.Saturday}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className=' text-zinc-100 bg-zinc-700 font-bold hover:bg-zinc-700'>
					<TableRow className='text-center hover:bg-zinc-700'>
						<TableCell className='font-bold text-center'>Total</TableCell>
						<TableCell>{total.Sunday}</TableCell>
						<TableCell>{total.Monday}</TableCell>
						<TableCell>{total.Tuesday}</TableCell>
						<TableCell>{total.Thursday}</TableCell>
						<TableCell>{total.Wednesday}</TableCell>
						<TableCell>{total.Friday}</TableCell>
						<TableCell>{total.Saturday}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
