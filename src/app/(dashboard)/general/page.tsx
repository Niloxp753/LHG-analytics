/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import CardLink from '../_components/CardLink';
import Header from '../_components/Header';
import SparkChart from '../_components/charts/SparkChart';
import { GeneralKpiFallback, GeneralKpiSection } from './kpi-section';

export default async function General({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedSearchParams = await searchParams;
	const menu = 'general';
	const preSet = resolvedSearchParams.set ?? DEFAULT_RANGE_TAG;
	const startDate = resolvedSearchParams.startDate;
	const endDate = resolvedSearchParams.endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5 '>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 p-4 w-full md:max-w-[82vw] backdrop-blur-md fixed z-20 top-0 flex flex-col gap-5'>
					<h2 className='text-zinc-50 font-bold text-2xl text-center'>
						Visão <span className='text-violet-400'> Geral</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className='flex flex-col mt-10 lg:mt-32 gap-5 w-full px-3'>
					<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
						<CardLink
							href={`/general/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart
									serie={[35, 40, 55, 45, 50, 40, 55, 45, 50]}
								/>
							}></CardLink>
						<CardLink
							href={`/general/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart
									serie={[45, 30, 55, 55, 45, 50, 35, 60, 40]}
								/>
							}></CardLink>
						<CardLink
							href={`/general/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart
									serie={[45, 40, 55, 45, 30, 55, 35, 55, 30]}
								/>
							}></CardLink>{' '}
						<CardLink
							href={`/general/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart
									serie={[55, 30, 55, 45, 50, 60, 55, 35, 55]}
								/>
							}></CardLink>
						<CardLink
							href={`/general/altana?menu=${menu}&set=${preSet}`}
							title={'Altana'}
							content={
								<SparkChart
									serie={[38, 52, 47, 58, 44, 61, 49, 56, 53]}
								/>
							}></CardLink>
						<CardLink
							href={`/general/liv?menu=${menu}&set=${preSet}`}
							title={'LIV'}
							content={
								<SparkChart
									serie={[40, 55, 45, 50, 40, 55, 45, 50, 40]}
								/>
							}></CardLink>
					</div>
					<Suspense
						fallback={
							<GeneralKpiFallback rangeDescription={rangeDescription} />
						}>
						<GeneralKpiSection
							endDate={formattedEndDate}
							period={preSet as string}
							rangeDescription={rangeDescription}
							startDate={formattedStartDate}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
