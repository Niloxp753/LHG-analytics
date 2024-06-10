/** @format */

import {
	Activity,
	AlarmClockCheck,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import CardDetails from './CardDetails';
import MenuFilter from './MenuFilter';

export default function Header() {
	return (
		<>
			<div className='ml-auto rounded py-1 px-3 border border-zinc-950/40 bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear cursor-pointer'>
				<MenuFilter />
			</div>
			<div className={`flex justify-between items-center w-full relative `}>
				<CardDetails
					type='money'
					icon={<HandCoins />}
					title={'Faturamento'}
					value={120000}
				/>
				<CardDetails
					icon={<Sigma />}
					title={'Locações'}
					value={500}
				/>
				<CardDetails
					type='money'
					icon={<SquarePercent />}
					title={'Ticket Médio'}
					value={240}
				/>
				<CardDetails
					type='money'
					icon={<Activity />}
					title={'RevPar'}
					value={320}
				/>
				<CardDetails
					icon={<DoorClosed />}
					title={'Tx de Ocupação'}
					value={'40%'}
				/>
				<CardDetails
					icon={<AlarmClockCheck />}
					title={'TMO'}
					value={'4 horas'}
				/>
			</div>
		</>
	);
}
