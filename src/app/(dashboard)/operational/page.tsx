/** @format */

import dynamic from 'next/dynamic';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import AfternoonCleaning from './_components/kpis-geral/afternoon-cleaning';
import CleaningAverageUnity from './_components/kpis-geral/cleaning-average-unity';
import MorningCleaning from './_components/kpis-geral/morning-cleaning';
import NightCleaning from './_components/kpis-geral/night-cleaning ';
import PerformanceUnity from './_components/kpis-geral/Performance-unity';
import TotalCleaningUnity from './_components/kpis-geral/total-cleaning-unity';

const SparkChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/SparkChart'),
	{ ssr: false },
);

export default async function Operational({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = 'operational';
	const preSet = searchParams.set || '7days';

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 '>
			<div
				className={`relative  ${
					open == 'true' ? 'md:max-w-[82vw] ' : 'md:max-w-[90vw]'
				}   flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full  ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 `}>
					<h2 className='text-zinc-50 font-bold text-3xl text-center'>
						Visão Geral
						<span className='text-violet-400'> {''}Operacional </span>
					</h2>
					<Header />
				</div>

				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-28'>
					<div className='flex gap-5 flex-col w-full h-full '>
						<div className='w-full h-full flex gap-5 flex-col md:flex-row'>
							<PerformanceUnity />
							<CleaningAverageUnity />
							<TotalCleaningUnity />
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<MorningCleaning />
						<AfternoonCleaning />
						<NightCleaning />
					</div>
					<div className='grid md:grid-cols-4 mt-10 gap-5'>
						<CardLink
							href={`/operational/lushipiranga?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
							}></CardLink>
						<CardLink
							href={`/operational/lushguaruja?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Guarujá'}
							content={
								<SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/operational/toutcampinas?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Tout Campinas'}
							content={
								<SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/operational/andardecima?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
							}></CardLink>
					</div>
				</div>
			</div>
		</main>
	);
}
