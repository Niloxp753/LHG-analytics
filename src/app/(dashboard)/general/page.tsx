/** @format */

import CardLink from '../components/CardLink';
import Header from '../components/Header';
import InvoicingXUnity from '../components/kpis/InvoicingXUnity';
import LocationsxUnity from '../components/kpis/LocationsxUnity';
import TKTxUnity from '../components/kpis/TKTxUnity';
import TRevParXUnity from '../components/kpis/TRevParXUnity';
import SparkChart from '../components/charts/SparkChart';

export default function General({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';
	const menu = searchParams.menu;

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5 py-10'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-2 justify-end `}>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-2 flex-col justify-start mt-36'>
					<div className='flex gap-2'>
						<div className='w-1/4'>
							<InvoicingXUnity />
						</div>
						<div className='w-3/4'>
							<LocationsxUnity />
						</div>
					</div>
					<div className='flex gap-2'>
						<div className='w-1/2'>
							<TKTxUnity />
						</div>
						<div className='w-1/2'>
							<TRevParXUnity />
						</div>
					</div>
					<div className='grid grid-cols-4 mt-10 gap-5'>
						<CardLink
							href={`/lushipiranga?menu=${menu}&open=${open}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40]} />
							}></CardLink>
						<CardLink
							href={`/lushguaruja?menu=${menu}&open=${open}`}
							title={'Lush Guarujá'}
							content={
								<SparkChart serie={[45, 30, 55, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/andardecima?menu=${menu}&open=${open}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60]} />
							}></CardLink>
						<CardLink
							href={`/toutcampinas?menu=${menu}&open=${open}`}
							title={'Tout Campinas'}
							content={
								<SparkChart serie={[45, 40, 55, 35, 55, 30]} />
							}></CardLink>
					</div>
				</div>
			</div>
		</main>
	);
}
