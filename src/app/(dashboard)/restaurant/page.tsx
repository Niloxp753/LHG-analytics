/** @format */

import CardLink from '../components/CardLink';
import SparkChart from '../components/charts/SparkChart';
import HeaderRestaurants from './components/HeaderRestaurants';
import UnityxCMV from './components/kpis/UnityxCMV';
import UnityxCMVxTime from './components/kpis/UnityxCMVxTime';
import UnityxCoust from './components/kpis/UnityxCoust';
import UnityxRevenue from './components/kpis/UnityxRevenue';
import UnityxRevenuexTime from './components/kpis/UnityxRevenuexTime';
import UnityxTKTxTime from './components/kpis/UnityxTKTxTime';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const preSet = searchParams.set || '7days';
	const menu = 'restaurant';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5 py-10'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 ml-auto ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold text-3xl'>
						Painel de <span className='text-violet-400'>Restaurantes</span>
					</h2>
					<HeaderRestaurants />
				</div>
				<div className='w-full flex flex-col mt-60'>
					<div className='flex gap-10 mb-5'>
						<UnityxRevenue />
						<UnityxCoust />
						<UnityxCMV />
					</div>
					<div className='flex flex-col gap-5'>
						<UnityxTKTxTime />
						<UnityxRevenuexTime />
						<UnityxCMVxTime />
					</div>
					<div className='grid grid-cols-4 mt-10 gap-5'>
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
