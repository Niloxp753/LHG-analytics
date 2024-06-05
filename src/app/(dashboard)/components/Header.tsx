/** @format */

import React from 'react';
import CardDetails from './CardDetails';
import MenuFilter from './MenuFilter';

export default function Header() {
	return (
		<>
			<div className='ml-auto rounded-lg py-1 px-3 border border-zinc-950/40 bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear cursor-pointer'>
				<MenuFilter />
			</div>
			<div className={`flex justify-between items-center w-full relative `}>
				<CardDetails
					title={'Faturamento'}
					value={120000}
				/>
				<CardDetails
					title={'Locações'}
					value={120000}
				/>
				<CardDetails
					title={'Ticket Médio'}
					value={120000}
				/>
				<CardDetails
					title={'RevPar'}
					value={120000}
				/>
				<CardDetails
					title={'Tx de Ocupação'}
					value={120000}
				/>
				<CardDetails
					title={'TMO'}
					value={120000}
				/>
			</div>
		</>
	);
}
