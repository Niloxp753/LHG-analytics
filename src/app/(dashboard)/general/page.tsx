/** @format */

import AreaChartsApex from '../components/AreaChartsApex';
import CardDetails from '../components/CardDetails';
import LineChartsApex from '../components/LineChartsApex';
import MenuFilter from '../components/MenuFilter';

export default function General({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let open = searchParams.open || 'true';

	return (
		<main className='flex h-full w-full min-h-screen  gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[91vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950 py-2 ${
						open == 'true' ? 'w-[82vw]' : 'w-[91vw]'
					} backdrop-blur-md fixed z-50 top-2 flex flex-col gap-5 justify-end`}>
					<div className='ml-auto rounded-lg w-[140px] h-[40px] border border-zinc-950/40 bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear cursor-pointer'>
						<MenuFilter />
					</div>

					<div className={`flex justify-between items-center w-full `}>
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
				</div>
				<div className=' w-full h-full flex gap-2 flex-col justify-start mt-48'>
					<div className=' max-h-[420px] h-full '>
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
			</div>
		</main>
	);
}
