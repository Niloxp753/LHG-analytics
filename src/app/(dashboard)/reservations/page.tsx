/** @format */

import { Blend, Coins, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { SiGoogleads, SiMeta } from 'react-icons/si';
import CardDetails from '../_components/CardDetails';
import CardLink from '../_components/CardLink';
import SparkChart from '../_components/charts/SparkChart';
import Header from '../_components/Header';
import { format } from 'date-fns';
import { getReservationPageData } from '@/actions/reservations/get-reservations-page';
import BigNumbersReservationPage from './_components/big-numbers-reservation-page';
import RevenueByCompany from './_components/page-kpis/revenue-by-company';
import DataByCompanyReservationsInTime from './_components/page-kpis/revenue-by-company-in-time';
import { Suspense } from 'react';

export default async function Reservations({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const menu = searchParams.menu;
	const preSet = searchParams.set || '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	async function getData() {
		if (startDate && endDate) {
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

	if (!resp.ok || !resp.data) {
		console.log(resp.error);
		return (
			<div className='text-muted-foreground'>
				Não foi possível encontrar os dados
			</div>
		);
	}

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw]
					} backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 md:justify-end `}>
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
								ipiranga={resp.data[0].BigNumbers}
								lapa={resp.data[1].BigNumbers}
								andar_de_cima={resp.data[2].BigNumbers}
								tout={resp.data[3].BigNumbers}
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								ecommerce={false}
							/>
						</Suspense>
					</div>
					<div className='flex flex-col md:flex-row gap-5'>
						<Suspense>
							<RevenueByCompany
								tout={resp.data[3].BigNumbers[0].currentDate.totalAllValue}
								andar_de_cima={
									resp.data[2].BigNumbers[0].currentDate.totalAllValue
								}
								ipiranga={resp.data[0].BigNumbers[0].currentDate.totalAllValue}
								lapa={resp.data[1].BigNumbers[0].currentDate.totalAllValue}
								title={'Faturamento por unidade'}
								money
							/>
							<RevenueByCompany
								tout={resp.data[3].BigNumbers[0].currentDate.totalAllBookings}
								andar_de_cima={
									resp.data[2].BigNumbers[0].currentDate.totalAllBookings
								}
								ipiranga={
									resp.data[0].BigNumbers[0].currentDate.totalAllBookings
								}
								lapa={resp.data[1].BigNumbers[0].currentDate.totalAllBookings}
								title={'Nº de Reservas por unidade'}
							/>
						</Suspense>
					</div>
					<div className='flex flex-col  gap-5'>
						<Suspense>
							<DataByCompanyReservationsInTime
								ipiranga={resp.data[0].BillingOfReservationsByPeriod}
								lapa={resp.data[1].BillingOfReservationsByPeriod}
								andar_de_cima={resp.data[2].BillingOfReservationsByPeriod}
								tout={resp.data[3].BillingOfReservationsByPeriod}
								title={'Faturamento por unidade'}
								money
							/>
						</Suspense>
						<Suspense>
							<DataByCompanyReservationsInTime
								ipiranga={resp.data[0].NumberOfReservationsPerPeriod}
								lapa={resp.data[1].NumberOfReservationsPerPeriod}
								andar_de_cima={resp.data[2].NumberOfReservationsPerPeriod}
								tout={resp.data[3].NumberOfReservationsPerPeriod}
								title={'Nº de reservas por unidade'}
								money={false}
							/>
						</Suspense>
						<Suspense>
							<DataByCompanyReservationsInTime
								ipiranga={resp.data[0].RepresentativenessOfReservesByPeriod}
								lapa={resp.data[1].RepresentativenessOfReservesByPeriod}
								andar_de_cima={
									resp.data[2].RepresentativenessOfReservesByPeriod
								}
								tout={resp.data[3].RepresentativenessOfReservesByPeriod}
								title={'Representatividade por unidade'}
								percent
							/>
						</Suspense>
					</div>

					<div className='flex flex-col gap-5'>
						<h2 className='text-4xl font-bold text-zinc-50 mt-10'>
							Indicadores de E-Commerce
						</h2>
						<Suspense>
							<BigNumbersReservationPage
								ipiranga={resp.data[0].BigNumbersEcommerce}
								lapa={resp.data[1].BigNumbersEcommerce}
								andar_de_cima={resp.data[2].BigNumbersEcommerce}
								tout={resp.data[3].BigNumbersEcommerce}
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
								ecommerce={true}
							/>
						</Suspense>

						<div className='w-full flex flex-col items-center justify-between gap-5'>
							<Suspense>
								<DataByCompanyReservationsInTime
									ipiranga={resp.data[0].BillingOfEcommerceByPeriod}
									lapa={resp.data[1].BillingOfEcommerceByPeriod}
									andar_de_cima={resp.data[2].BillingOfEcommerceByPeriod}
									tout={resp.data[3].BillingOfEcommerceByPeriod}
									title={'Faturamento por unidade - Ecommerce'}
									money
								/>
							</Suspense>
							<Suspense>
								<DataByCompanyReservationsInTime
									ipiranga={resp.data[0].ReservationsOfEcommerceByPeriod}
									lapa={resp.data[1].ReservationsOfEcommerceByPeriod}
									andar_de_cima={resp.data[2].ReservationsOfEcommerceByPeriod}
									tout={resp.data[3].ReservationsOfEcommerceByPeriod}
									title={'Representatividade por unidade - Ecommerce'}
									percent
								/>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
