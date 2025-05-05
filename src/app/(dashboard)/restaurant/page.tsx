/** @format */

import {
	DiamondPercent,
	HandCoins,
	Sigma,
	SquarePercent,
	TrendingUp,
} from 'lucide-react';
import CardDetails from '../_components/CardDetails';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import Header from '../_components/Header';
import UnityxCMV from './_components/kpis/UnityxCMV';
import UnityxCMVxTime from './_components/kpis/UnityxCMVxTime';
import UnityxCoust from './_components/kpis/UnityxCoust';
import UnityxRevenue from './_components/kpis/UnityxRevenue';
import UnityxRevenuexTime from './_components/kpis/UnityxRevenuexTime';
import UnityxTKTxTime from './_components/kpis/UnityxTKTxTime';
import GenerateBadge from '../general/_components/generate-badge';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const preSet = searchParams.set || '7days';
	const menu = 'restaurant';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10'>
			<div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1'>
						Painel de <span className='text-violet-400'> {''}Restaurantes</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className='w-full flex flex-col mt-12 lg:mt-32 h-full gap-5 px-3 md:px-0'>
					<div className='grid md:grid-cols-4 gap-5'>
						<CardLink
							href={`/restaurant/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart serie={[45, 30, 55, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/restaurant/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart serie={[45, 40, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/restaurant/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60]} />
							}></CardLink>
					</div>
					<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 321.005,00' : ''
							} ${preSet == '30days' ? '30 dias atrás ' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							type='money'
							icon={<HandCoins />}
							title={'Receita De A&B'}
							value={341518}
							Badge={
								<GenerateBadge
									val={341518}
									previousVal={321005}
								/>
							}
						/>
						<CardDetails
							description={`${preSet == '7days' ? '7 dias atrás 254' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							icon={<Sigma />}
							title={'Nº De Vendas'}
							value={397}
							Badge={
								<GenerateBadge
									val={397}
									previousVal={254}
								/>
							}
						/>
						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 794,00' : ''
							} ${preSet == '30days' ? '30 dias atrá s' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							type='money'
							icon={<SquarePercent />}
							title={'Ticket Médio A&B'}
							value={860}
							Badge={
								<GenerateBadge
									val={860}
									previousVal={794}
								/>
							}
						/>

						<CardDetails
							description={`${
								preSet == '7days' ? '7 dias atrás R$ 598,00' : ''
							} ${preSet == '30days' ? '30 dias atrás ' : ''} ${
								preSet == '6months' ? '6 meses atrás ' : ''
							}${preSet == '12months' ? '12 meses atrás ' : ''}`}
							icon={<DiamondPercent />}
							type='money'
							title={'TKT Médio A&B / Locação'}
							value={668}
							Badge={
								<GenerateBadge
									val={668}
									previousVal={598}
								/>
							}
						/>
					</div>
					<div className='flex md:gap-10 gap-5 mb-5 flex-col md:flex-row mx-auto w-full h-full'>
						<UnityxRevenue />
						<UnityxCoust />
						{/* <UnityxCMV /> */}
					</div>
					<div className='flex flex-col gap-5'>
						<UnityxTKTxTime />
						<UnityxRevenuexTime />
						{/* <UnityxCMVxTime /> */}
					</div>
				</div>
			</div>
		</main>
	);
}
