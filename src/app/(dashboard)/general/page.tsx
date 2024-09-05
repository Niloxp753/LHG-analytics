/** @format */

import CardLink from '../components/CardLink';
import Header from '../components/Header';
import InvoicingXUnity from '../components/kpis/InvoicingXUnity';
import LocationsxUnity from '../components/kpis/LocationsxUnity';
import TKTxUnity from '../components/kpis/TKTxUnity';
import TRevParXUnity from '../components/kpis/TRevParXUnity';
import dynamic from 'next/dynamic';
import InvoicingXUnityXTime from '../components/kpis/InvoicingXUnityXTime';
import OccupationXUnity from '../components/kpis/OccupationXUnity';
const SparkChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/SparkChart'),
	{ ssr: false },
);

export default function General({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = 'general';
	const preSet = searchParams.set || '7days';

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 '>
			<div
				className={`relative  ${
					open == 'true' ? 'md:max-w-[82vw] ' : 'md:max-w-[90vw]'
				}   flex   md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full  ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-3xl text-center md:text-start'>
						Visão<span className='text-violet-400'> {''}Geral</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col justify-start mt-64 px-3'>
					<div className='flex gap-5 flex-col md:flex-row w-full'>
						<div className='md:w-1/3 w-full'>
							<InvoicingXUnity />
						</div>
						<div className='md:w-2/3'>
							<LocationsxUnity />
						</div>
					</div>
					<div className='flex gap-5 flex-col md:flex-row'>
						<div className='md:w-1/2'>
							<TKTxUnity />
						</div>
						<div className='md:w-1/2'>
							<TRevParXUnity />
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<InvoicingXUnityXTime />
						<OccupationXUnity />
					</div>
					<div className='grid md:grid-cols-4 mt-10 gap-5'>
						<CardLink
							href={`/general/lushipiranga?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
							}></CardLink>
						<CardLink
							href={`/general/lushguaruja?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Lush Guarujá'}
							content={
								<SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/general/toutcampinas?menu=${menu}&open=${open}&set=${preSet}`}
							title={'Tout Campinas'}
							content={
								<SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/general/andardecima?menu=${menu}&open=${open}&set=${preSet}`}
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
