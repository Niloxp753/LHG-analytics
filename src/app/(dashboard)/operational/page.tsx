/** @format */

import { getOperationPageData } from '@/actions/initial-pages/operation';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import AfternoonCleaning from './_components/kpis-geral/afternoon-cleaning';
import BigNumbersPageOp from './_components/kpis-geral/big-numbers';
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
	const menu = 'operational';
	const preSet = searchParams.set || '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	async function getData() {
		if (startDate && endDate) {
			const customData = await getOperationPageData({
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			});
			if (customData) {
				return customData;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		} else {
			const data = await getOperationPageData({ period: preSet });
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
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center text-xl'>
						Visão Geral
						<span className='text-violet-400'> {''}Operacional </span>
					</h2>
					<Header />
				</div>

				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-24 md:mt-32'>
					<div className='grid md:grid-cols-4 gap-5'>
						<CardLink
							href={`/operational/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]} />
							}></CardLink>
						<CardLink
							href={`/operational/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/operational/toutcampinas?menu=${menu}&set=${preSet}`}
							title={'Tout Campinas'}
							content={
								<SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/operational/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
							}></CardLink>
					</div>
					<div className='flex gap-5 flex-col w-full h-full '>
						<BigNumbersPageOp
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
							ipiranga={resp.data[0].BigNumbers}
							lapa={resp.data[1].BigNumbers}
						/>
						<div className='w-full h-full flex gap-5 flex-col md:flex-row'>
							<TotalCleaningUnity
								ipiranga={
									resp.data[0].BigNumbers[0].currentDate.totalAllSuitesCleanings
								}
								lapa={
									resp.data[1].BigNumbers[0].currentDate.totalAllSuitesCleanings
								}
							/>
							<CleaningAverageUnity
								ipiranga={
									resp.data[0].BigNumbers[0].currentDate
										.totalAllAverageDailyCleaning
								}
								lapa={
									resp.data[1].BigNumbers[0].currentDate
										.totalAllAverageDailyCleaning
								}
							/>
							<PerformanceUnity
								ipiranga={resp.data[0].SupervisorsPerformance}
								lapa={resp.data[1].SupervisorsPerformance}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<MorningCleaning
							ipiranga={resp.data[0].EmployeeCleaningByShift}
							lapa={resp.data[1].EmployeeCleaningByShift}
						/>
						<AfternoonCleaning
							ipiranga={resp.data[0].EmployeeCleaningByShift}
							lapa={resp.data[1].EmployeeCleaningByShift}
						/>
						<NightCleaning
							ipiranga={resp.data[0].EmployeeCleaningByShift}
							lapa={resp.data[1].EmployeeCleaningByShift}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
