/** @format */

import { getReservationPageData } from '@/actions/reservations/get-reservations-page';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { Suspense } from 'react';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import Header from '../_components/Header';
import BigNumbersReservationPage from './_components/big-numbers-reservation-page';
import DataByCompanyReservationsInTime from './_components/page-kpis/revenue-by-company-in-time';
import RevenueByCompany from './_components/page-kpis/revenue-by-company';
import BookingsByCompany from './_components/page-kpis/bookings-by-company';
import BigNumbersEcommerce from './_components/big-numbers-ecommerce';
import type { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';

type NamedSeriesData = {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
};

type ReservationsUnifiedData = {
	BigNumbers: ReservationsBigNumbersEntry[];
	BigNumbersEcommerce: ReservationsBigNumbersEntry[];
	BillingOfReservationsByPeriod: NamedSeriesData;
	NumberOfReservationsPerPeriod: NamedSeriesData;
	RepresentativenessOfReservesByPeriod: NamedSeriesData;
	BillingOfEcommerceByPeriod: NamedSeriesData;
	ReservationsOfEcommerceByPeriod: NamedSeriesData;
	RevenueByCompany: NamedSeriesData;
	BookingsByCompany: NamedSeriesData;
};

export default async function Reservations({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const menu = searchParams.menu;
	const preSet = searchParams.set || DEFAULT_RANGE_TAG;
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;
	const rangeDescription = getRangeDescription(preSet);

	const formattedStartDate = formatDateInput(startDate);
	const formattedEndDate = formatDateInput(endDate);

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getReservationPageData({
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			});
			if (customData) {
				return customData;
			}
			return { ok: false, data: null, error: 'Algo deu errado' };
		} else {
			const data = await getReservationPageData({ period: preSet });
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

	const unifiedData =
		!hasError && !Array.isArray(resp.data)
			? (resp.data as ReservationsUnifiedData)
			: null;
	const bigNumbers = hasError ? null : unifiedData?.BigNumbers ?? null;
	const billingOfReservationsByPeriod = hasError
		? null
		: unifiedData?.BillingOfReservationsByPeriod ?? null;
	const numberOfReservationsPerPeriod = hasError
		? null
		: unifiedData?.NumberOfReservationsPerPeriod ?? null;
	const representativenessOfReservesByPeriod = hasError
		? null
		: unifiedData?.RepresentativenessOfReservesByPeriod ?? null;
	const BillingOfEcommerceByPeriod = hasError
		? null
		: unifiedData?.BillingOfEcommerceByPeriod ?? null;
	const reservationsOfEcommerceByPeriod = hasError
		? null
		: unifiedData?.ReservationsOfEcommerceByPeriod ?? null;
	const revenueByCompany = hasError ? null : unifiedData?.RevenueByCompany ?? null;
	const bookingsByCompany = hasError
		? null
		: unifiedData?.BookingsByCompany ?? null;

	const bigNumbersEcommerce = hasError
		? null
		: unifiedData?.BigNumbersEcommerce ?? null;
	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw]
					} backdrop-blur-md fixed z-10 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center pt-1'>
						Painel de<span className='text-violet-400'> {''}Reservas</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>

				<div className=' w-full  flex gap-5 flex-col justify-start px-3 md:px-0  mt-12 lg:mt-32'>
					<div className='grid md:grid-cols-4 gap-5'>
						<CardLink
							href={`/reservations/lushipiranga?menu=${menu}&set=${preSet}`}
							title={'Lush Ipiranga'}
							content={
								<SparkChart serie={[35, 40, 55, 45, 50, 40]} />
							}></CardLink>
						<CardLink
							href={`/reservations/lushlapa?menu=${menu}&set=${preSet}`}
							title={'Lush Lapa'}
							content={
								<SparkChart serie={[45, 30, 55, 35, 60, 40]} />
							}></CardLink>
						<CardLink
							href={`/reservations/tout?menu=${menu}&set=${preSet}`}
							title={'Tout'}
							content={
								<SparkChart serie={[45, 40, 55, 35, 55, 30]} />
							}></CardLink>{' '}
						<CardLink
							href={`/reservations/andardecima?menu=${menu}&set=${preSet}`}
							title={'Andar de Cima'}
							content={
								<SparkChart serie={[55, 30, 55, 45, 50, 60]} />
							}></CardLink>
					</div>
					<div>
						<Suspense>
							<BigNumbersReservationPage
								data={bigNumbers}
								description={rangeDescription}
								ecommerce={false}
							/>
						</Suspense>
					</div>

					<div className='flex flex-col md:flex-row gap-5'>
						<Suspense>
							<RevenueByCompany
								data={revenueByCompany}
								title={'Faturamento por unidade'}
								money
								error={errorMessage}
							/>
							<BookingsByCompany
								data={bookingsByCompany}
								title={'Número de Reservas por unidade'}
								error={errorMessage}
							/>
						</Suspense>
					</div>
					<div className='flex flex-col  gap-5'>
						<Suspense>
							<DataByCompanyReservationsInTime
								data={billingOfReservationsByPeriod}
								title={'Faturamento por unidade no tempo'}
								money
								error={errorMessage}
							/>
						</Suspense>
						<Suspense>
							<DataByCompanyReservationsInTime
								data={numberOfReservationsPerPeriod}
								title={'Número de reservas por unidade'}
								money={false}
								error={errorMessage}
							/>
						</Suspense>
						<Suspense>
							<DataByCompanyReservationsInTime
								data={representativenessOfReservesByPeriod}
								title={'Representatividade por unidade'}
								percent
								error={errorMessage}
							/>
						</Suspense>
					</div>

					<div className='flex flex-col gap-5'>
						<h2 className='text-4xl font-bold text-zinc-50 mt-10'>
							Indicadores de E-Commerce
						</h2>
						<Suspense>
							<BigNumbersEcommerce
								data={bigNumbersEcommerce}
								description={rangeDescription}
							/>
						</Suspense>

						<div className='w-full flex flex-col items-center justify-between gap-5'>
							<Suspense>
								<DataByCompanyReservationsInTime
									data={BillingOfEcommerceByPeriod}
									title={'Faturamento por unidade - Ecommerce'}
									money
									error={errorMessage}
								/>
							</Suspense>
							<Suspense>
								<DataByCompanyReservationsInTime
									data={reservationsOfEcommerceByPeriod}
									title={'Representatividade por unidade - Ecommerce'}
									percent
									error={errorMessage}
								/>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
