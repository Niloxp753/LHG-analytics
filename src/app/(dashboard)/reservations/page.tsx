/** @format */

import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import Header from '../_components/Header';
import {
	ReservationsKpiFallback,
	ReservationsKpiSection,
} from './kpi-section';

export default async function Reservations({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedSearchParams = await searchParams;
	const menu = resolvedSearchParams.menu;
	const preSet = resolvedSearchParams.set || DEFAULT_RANGE_TAG;
	const startDate = resolvedSearchParams.startDate;
	const endDate = resolvedSearchParams.endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div className='relative md:max-w-[82vw] flex md:ml-auto w-full'>
				<div className='bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed z-10 top-0 flex flex-col gap-5 md:justify-end'>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center pt-1'>
						Painel de<span className='text-violet-400'> {''}Reservas</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className='w-full flex flex-col gap-5'>
					<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-3 md:px-0 mt-12 lg:mt-32'>
						<CardLink
							href={`/reservations/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={<SparkChart serie={[35, 40, 55, 45, 50, 40]} />}></CardLink>
						<CardLink
							href={`/reservations/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={<SparkChart serie={[45, 30, 55, 35, 60, 40]} />}></CardLink>
						<CardLink
							href={`/reservations/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={<SparkChart serie={[45, 40, 55, 35, 55, 30]} />}></CardLink>{' '}
						<CardLink
							href={`/reservations/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={<SparkChart serie={[55, 30, 55, 45, 50, 60]} />}></CardLink>
						<CardLink
							href={`/reservations/altana?menu=${menu}&set=${preSet}`}
							title={'Altana'}
							content={<SparkChart serie={[41, 54, 46, 59, 51, 57]} />}></CardLink>
						<CardLink
							href={`/reservations/liv?menu=${menu}&set=${preSet}`}
							title={'LIV'}
							content={<SparkChart serie={[40, 55, 45, 50, 40, 55]} />}></CardLink>
					</div>
					<Suspense
						fallback={
							<ReservationsKpiFallback description={rangeDescription} />
						}>
						<ReservationsKpiSection
							description={rangeDescription}
							endDate={formattedEndDate}
							period={preSet as string}
							startDate={formattedStartDate}
						/>
					</Suspense>
				</div>
			</div>
		</main>
	);
}
