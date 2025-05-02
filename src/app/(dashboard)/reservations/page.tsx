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

	console.log(resp.data[0].BigNumbers);
	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div className={`relative  md:max-w-[82vw] flex  md:ml-auto w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw]
					} backdrop-blur-md fixed z-40 top-0 flex flex-col gap-5 md:justify-end `}>
					<h2 className='text-zinc-50 font-bold text-2xl md:text-3xl text-center pt-1'>
						Painel de<span className='text-violet-400'> {''}Reservas</span>
					</h2>
					<Header />
				</div>

				<div className=' w-full  flex gap-5 flex-col justify-start px-3 md:px-0'>
					<div className='grid md:grid-cols-4 mt-10 gap-5'>
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
							href={`/reservations/toutcampinas?menu=${menu}&set=${preSet}`}
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
					</div>
					{/* <div className='flex gap-5'>
						<InvoicingXTypes />
						<InvoicingXChannel />
					</div>
					<div className='gap-5 h-fit w-full flex flex-col justify-between '>
						<CategoriesXReservs />
						<InvoicingXReservs />
					</div>
					<div className='flex items-center justify-between gap-5 h-full w-full'>
						<Representation />
						<LocationsXReservs />
					</div> */}

					<div>
						<h2 className='text-4xl font-bold text-zinc-50 mt-10 mb-5'>
							Indicadores de E-Commerce
						</h2>

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

						{/* <div className='w-full flex flex-col items-center justify-between gap-5'>
								<EcommerceRevervs />
								<EcommerceRevenue />
							</div> */}
					</div>
				</div>
			</div>
		</main>
	);
}
