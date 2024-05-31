/** @format */

import AreaChartsApex from '../components/AreaChartsApex';
import CardDetails from '../components/CardDetails';
import LineChartsApex from '../components/LineChartsApex';
import MenuFilter from '../components/MenuFilter';

export default function General() {
	return (
		<main className='flex h-full w-full min-h-screen items-center gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden'>
			<div className='fixed right-2 top-1 rounded-lg w-[140px] h-[40px] border border-zinc-950/40 bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear cursor-pointer'>
				<MenuFilter />
			</div>
			<div className='flex justify-between items-center ml-auto w-[85%] px-1 mt-10'>
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
			<div className=' w-[85%] ml-auto h-full flex flex-col justify-between'>
				<div className=' max-h-[440px] h-full'>
					<AreaChartsApex />
				</div>
				<div className=' max-h-[440px] gap-5 h-full w-full flex justify-between'>
					<div className='  max-h-[440px] h-full w-full'>
						<LineChartsApex
							title={'Ticket Médio x TRevPar'}
							legend01={'Ticket Médio'}
							legend02='TRevPar'
						/>
					</div>
					<div className='  max-h-[440px] h-full w-full'>
						<LineChartsApex
							title={'Locação x RevPar'}
							legend01={'Locação'}
							legend02='RevPar'
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
