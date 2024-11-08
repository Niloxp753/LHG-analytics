/** @format */

import {
	HandCoins,
	Sigma,
	SquarePercent,
	TrendingDown,
	DiamondPercent,
	TrendingUp,
} from 'lucide-react';
import CardDetails from '../_components/CardDetails';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import HeaderRestaurants from './components/HeaderRestaurants';
import UnityxCMV from './components/kpis/UnityxCMV';
import UnityxCMVxTime from './components/kpis/UnityxCMVxTime';
import UnityxCoust from './components/kpis/UnityxCoust';
import UnityxRevenue from './components/kpis/UnityxRevenue';
import UnityxRevenuexTime from './components/kpis/UnityxRevenuexTime';
import UnityxTKTxTime from './components/kpis/UnityxTKTxTime';
import Header from '../_components/Header';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const preSet = searchParams.set || '7days';
	const menu = 'restaurant';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10'>
			<div
				className={`relative  ${
					open == 'true' ? 'md:max-w-[82vw] ' : 'md:max-w-[90vw]'
				}   flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full  ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1'>
						Painel de <span className='text-violet-400'> {''}Restaurantes</span>
					</h2>
					<Header />
				</div>
				<div className='w-full flex flex-col mt-28 h-full gap-5 px-3 md:px-0'>
					<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							type='money'
							icon={<HandCoins />}
							title={'Receita De A&B'}
							value={341518}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<Sigma />}
							title={'Nº De Vendas'}
							value={397}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrá s' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							type='money'
							icon={<SquarePercent />}
							title={'Ticket Médio A&B'}
							value={860}
						/>

						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<TrendingUp />}
							title={'CMV Total'}
							value={19}
						/>

						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<DiamondPercent />}
							title={'TKT Médio A&B / Locação'}
							value={22}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<DiamondPercent />}
							title={'TKT Médio A&B / Locação'}
							value={22}
						/>
					</div>
					<div className='flex md:gap-10 gap-5 mb-5 flex-col md:flex-row mx-auto w-full h-full'>
						<UnityxRevenue />
						<UnityxCoust />
						<UnityxCMV />
					</div>
					<div className='flex flex-col gap-5'>
						<UnityxTKTxTime />
						<UnityxRevenuexTime />
						<UnityxCMVxTime />
					</div>
					<div className='grid md:grid-cols-4 mt-10 gap-5'>
						<CardLink
							href={`/restaurant/lushipiranga?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/lushguaruja?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Guarujá'}
							content={
								<SparkChart serie={[45, 30, 55, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/toutcampinas?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Tout Campinas'}
							content={
								<SparkChart serie={[45, 40, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/restaurant/andardecima?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60]} />
							}></CardLink>
					</div>
				</div>
			</div>
		</main>
	);
}
