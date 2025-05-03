/** @format */

import { getGeneralPageData } from '@/actions/initial-pages/general';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import InvoicingXUnity from '../_components/kpis/InvoicingXUnity';
import InvoicingXUnityXTime from '../_components/kpis/InvoicingXUnityXTime';
import LocationsxUnity from '../_components/kpis/LocationsxUnity';
import OccupationXUnity from '../_components/kpis/OccupationXUnity';
import TKTxUnity from '../_components/kpis/TKTxUnity';
import TRevParXUnity from '../_components/kpis/TRevParXUnity';
import BigNumbersCompany from './_components/big-numbers-company';
import { Suspense } from 'react';
const SparkChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/SparkChart'),
	{ ssr: false },
);

export default async function General({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const menu = 'general';
	const preSet = searchParams.set ?? '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	async function getData() {
		if (startDate && endDate) {
			const customData = await getGeneralPageData({
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			});
			if (customData) {
				return customData;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		} else {
			const data = await getGeneralPageData({ period: preSet });
			if (data) {
				return data;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		}
	}

	const resp = await getData();

	if (!resp.ok || !resp.data) {
		console.log(resp.error);
		return (
			<div className='text-muted-foreground'>
				Não foi possível encontrar os dados
			</div>
		);
	}

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:max-w-[82vw] backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 `}>
					<h2 className='text-zinc-50 font-bold text-2xl text-center'>
						Visão <span className='text-violet-400'> Geral</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className='flex flex-col mt-10 lg:mt-32 gap-5 w-full px-3'>
					<div className='grid md:grid-cols-4 gap-5'>
						<CardLink
							href={`/general/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
							}></CardLink>
						<CardLink
							href={`/general/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/general/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/general/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
							}></CardLink>
					</div>
					<div className=' w-full h-full flex gap-5 flex-col md:px-0 '>
						<Suspense>
							<BigNumbersCompany
								andar_de_cima={resp.data ? resp.data[2]?.BigNumbers : null}
								tout={resp.data ? resp.data[3]?.BigNumbers : null}
								ipiranga={resp.data ? resp.data[0]?.BigNumbers : null}
								lapa={resp.data ? resp.data[1].BigNumbers : null}
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
							/>

							<div className='flex gap-5 flex-col md:flex-row w-full h-full '>
								<div className='md:w-1/3 w-full h-full '>
									<InvoicingXUnity
										tout={resp.data[3].BigNumbers[0].currentDate.totalAllValue}
										andar_de_cima={
											resp.data[2].BigNumbers[0].currentDate.totalAllValue
										}
										ipiranga={
											resp.data[0].BigNumbers[0].currentDate.totalAllValue
										}
										lapa={resp.data[1].BigNumbers[0].currentDate.totalAllValue}
									/>
								</div>
								<div className='md:w-2/3 h-full '>
									<LocationsxUnity
										andar_de_cima={resp.data[2].RentalsByDate}
										tout={resp.data[3].RentalsByDate}
										ipiranga={resp.data[0].RentalsByDate}
										lapa={resp.data[1].RentalsByDate}
									/>
								</div>
							</div>
							<div className='flex gap-5 flex-col'>
								<TKTxUnity
									andar_de_cima={resp.data[2].TicketAverageByDate}
									tout={resp.data[3].TicketAverageByDate}
									ipiranga={resp.data[0].TicketAverageByDate}
									lapa={resp.data[1].TicketAverageByDate}
								/>
								<TRevParXUnity
									andar_de_cima={resp.data[2].TrevparByDate}
									tout={resp.data[3].TrevparByDate}
									ipiranga={resp.data[0].TrevparByDate}
									lapa={resp.data[1].TrevparByDate}
								/>
							</div>
							<div className='flex flex-col gap-5'>
								<InvoicingXUnityXTime
									andar_de_cima={resp.data[2].RevenueByDate}
									tout={resp.data[3].RevenueByDate}
									ipiranga={resp.data[0].RevenueByDate}
									lapa={resp.data[1].RevenueByDate}
								/>
								<OccupationXUnity
									andar_de_cima={resp.data[2].OccupancyRateByDate}
									tout={resp.data[3].OccupancyRateByDate}
									ipiranga={resp.data[0].OccupancyRateByDate}
									lapa={resp.data[1].OccupancyRateByDate}
								/>
							</div>
						</Suspense>
					</div>
				</div>
			</div>
		</main>
	);
}
