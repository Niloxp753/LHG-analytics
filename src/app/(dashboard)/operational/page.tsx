/** @format */

import { getOperationalPageData } from '@/actions/initial-pages/operation';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import SparkChart from '../_components/charts/SparkChart';
import AfternoonCleaning from './_components/kpis-geral/afternoon-cleaning';
import BigNumbersPageOp from './_components/kpis-geral/big-numbers';
import CleaningAverageUnity from './_components/kpis-geral/cleaning-average-unity';
import MorningCleaning from './_components/kpis-geral/morning-cleaning';
import NightCleaning from './_components/kpis-geral/night-cleaning ';
import PerformanceUnity from './_components/kpis-geral/Performance-unity';
import TotalCleaningUnity from './_components/kpis-geral/total-cleaning-unity';
import { ShiftCleaning } from './types';

export default async function Operational({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const menu = 'operational';
	const preSet = (await searchParams).set || DEFAULT_RANGE_TAG;
	const startDate = (await searchParams).startDate;
	const endDate = (await searchParams).endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getOperationalPageData({
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			});
			if (customData) {
				return customData;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		} else {
			const data = await getOperationalPageData({ period: preSet as string });
			if (data) {
				return data;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		}
	}

	const resp = await getData();

	const hasError = !resp.ok || !resp.data;
	const errorMessage =
		hasError && resp.error
			? resp.error
			: hasError
				? 'Não foi possível carregar os dados.'
				: undefined;

	const unifiedData = hasError ? null : resp.data;
	const bigNumbers = hasError ? null : unifiedData?.BigNumbers;

	const cleaningsByCompany = hasError ? null : unifiedData?.CleaningsByCompany;
	const averageCleaningByCompany = hasError
		? null
		: unifiedData?.AverageCleaningByCompany;
	const inspectionsByCompany = hasError
		? null
		: unifiedData?.InspectionsByCompany;
	const shiftCleaning: ShiftCleaning | null = hasError
		? null
		: unifiedData?.ShiftCleaning;

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center text-xl'>
						Visão Geral
						<span className='text-violet-400'> {''}Operacional </span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
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
							href={`/operational/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/operational/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]} />
							}></CardLink>
						<CardLink
							href={`/operational/liv?menu=${menu}&set=${preSet}`}
							title={'LIV'}
							content={
								<SparkChart serie={[40, 55, 45, 50, 40, 55, 45, 50, 40]} />
							}></CardLink>
					</div>
					<div className='flex gap-5 flex-col w-full h-full '>
						<BigNumbersPageOp
							data={bigNumbers}
							description={rangeDescription}
						/>
						<div className='w-full h-full flex gap-5 flex-col md:flex-row'>
							<TotalCleaningUnity
								data={cleaningsByCompany}
								error={errorMessage}
							/>
							<CleaningAverageUnity
								data={averageCleaningByCompany}
								error={errorMessage}
							/>
							<PerformanceUnity
								data={inspectionsByCompany}
								error={errorMessage}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<MorningCleaning
							error={errorMessage}
							data={shiftCleaning}
						/>
						<AfternoonCleaning
							error={errorMessage}
							data={shiftCleaning}
						/>
						<NightCleaning
							error={errorMessage}
							data={shiftCleaning}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
