/** @format */

import { getReservationsAction } from '@/actions/reservations/get-reservations';
import { getReservationsCustomAction } from '@/actions/reservations/get-reservations-custom';
import Header from '@/app/(dashboard)/_components/Header';
import InvoicingXChannel from '@/app/(dashboard)/reservations/_components/kpis/InvoicingXChannel';
import {
	DEFAULT_RANGE_TAG,
	formatDateInput,
	getRangeDescription,
} from '@/lib/date-range';
import { TableReservs } from '../../../_components/kpis/TableReservs';
import BigNumbersEcommerce from '../../_components/big-numbers-ecommerce';
import BigNumbersReservation from '../../_components/big-numbers-reservations';
import CategoriesXReservs from '../../_components/kpis/CategoriesXReservs';
import EcommerceRevenue from '../../_components/kpis/ecommerce-receita';
import EcommerceRevervs from '../../_components/kpis/ecommerce-reservas';
import InvoicingXReservs from '../../_components/kpis/InvoicingXReservs';
import InvoicingXTypes from '../../_components/kpis/InvoicingXTypes';
import LocationsXReservs from '../../_components/kpis/LocationsXReservs';
import Representation from '../../_components/kpis/Representation';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const preSet = (await searchParams).set || DEFAULT_RANGE_TAG;
	const startDate = (await searchParams).startDate;
	const endDate = (await searchParams).endDate;
	const rangeDescription = getRangeDescription(preSet as string);

	const formattedStartDate = formatDateInput(startDate as string);
	const formattedEndDate = formatDateInput(endDate as string);

	async function getData() {
		if (formattedStartDate && formattedEndDate) {
			const customData = await getReservationsCustomAction(
				formattedStartDate!,
				formattedEndDate!,
				'andar_de_cima',
			);
			if (customData) {
				return customData;
			} else {
				return null;
			}
		} else {
			const data = await getReservationsAction(
				(preSet as string) ?? DEFAULT_RANGE_TAG,
				'andar_de_cima',
			);
			if (data) {
				return data;
			} else {
				return null;
			}
		}
	}

	const resp = await getData();

	if (!resp) {
		return (
			<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
				<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
					<div
						className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
						<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
							Reservas -{' '}
							<span className='text-violet-400 text-base md:text-3xl'>
								{''}Andar de Cima
							</span>
						</h2>
						<div className='hidden lg:block'>
							<Header />
						</div>
					</div>
					<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
						<p className='text-zinc-100'>Não foi possível carregar os dados.</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-14 md:px-5 '>
			<div className={`relative md:max-w-[82vw] flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base'>
						Reservas -{' '}
						<span className='text-violet-400 text-base md:text-3xl'>
							{''}Andar de Cima
						</span>
					</h2>
					<div className='hidden lg:block'>
						<Header />
					</div>
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 md:mt-32'>
					<BigNumbersReservation
						data={resp?.BigNumbers}
						description={rangeDescription}
					/>
					<CategoriesXReservs
						series={resp.ReservationsByRentalType.series}
						categories={resp.ReservationsByRentalType.categories}
					/>
					<div className='flex flex-col md:flex-row w-full gap-5'>
						<InvoicingXTypes
							series={resp.PaymentMethods.series}
							categories={resp.PaymentMethods.categories}
						/>
						<InvoicingXChannel
							series={resp.BillingPerChannel.series}
							categories={resp.BillingPerChannel.categories}
						/>
					</div>

					<div className='grid grid-cols-1 w-full gap-5'>
						<InvoicingXReservs
							series={resp.BillingOfReservationsByPeriod.series}
							categories={resp.BillingOfReservationsByPeriod.categories}
						/>
						<Representation
							series={resp.RepresentativenessOfReservesByPeriod.series}
							categories={resp.RepresentativenessOfReservesByPeriod.categories}
						/>
						<LocationsXReservs
							series={resp.NumberOfReservationsPerPeriod.series}
							categories={resp.NumberOfReservationsPerPeriod.categories}
						/>
					</div>
					<div>
						<TableReservs data={resp.KpiTableByChannelType[0]} />
					</div>
					<div>
						<h2 className='text-2xl md:text-4xl font-bold text-zinc-50 mt-10 mb-5'>
							Indicadores de E-Commerce
						</h2>
						<div className='flex flex-col w-full items-start justify-between gap-5'>
							<BigNumbersEcommerce
								data={resp?.BigNumbersEcommerce}
								description={rangeDescription}
							/>

							<div className='w-full flex flex-col items-center justify-between gap-5'>
								<EcommerceRevervs
									series={resp.ReservationsOfEcommerceByPeriod.series}
									categories={resp.ReservationsOfEcommerceByPeriod.categories}
								/>
								<EcommerceRevenue
									series={resp.BillingOfEcommerceByPeriod.series}
									categories={resp.BillingOfEcommerceByPeriod.categories}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

