/** @format */

import { getCompanyAction } from '@/actions/getCompany';
import { getCompanyCustomAction } from '@/actions/getCompanyCustom';
import Header from '@/app/(dashboard)/_components/Header';
import BigNumbers from '@/app/(dashboard)/_components/bignumber';
import Invoicing from '@/app/(dashboard)/_components/kpis/Invoicing';
import Categories from '@/app/(dashboard)/_components/kpis/InvoicingXCategories';
import InvoicingXLocation from '@/app/(dashboard)/_components/kpis/InvoicingXLocation';
import Locations from '@/app/(dashboard)/_components/kpis/Locations';
import Occupation from '@/app/(dashboard)/_components/kpis/Occupation';
import OccupationCasaLush from '@/app/(dashboard)/_components/kpis/OccupationCasaLush';
import RevPar from '@/app/(dashboard)/_components/kpis/RevPar';
import TRevPar from '@/app/(dashboard)/_components/kpis/TRevPar';
import TableKpiCategory from '@/app/(dashboard)/_components/kpis/TableKpiCategory';
import { TableKpiGiro } from '@/app/(dashboard)/_components/kpis/TableKpiGiro';
import { TableKpiOccupation } from '@/app/(dashboard)/_components/kpis/TableKpiOccupation';
import Ticket from '@/app/(dashboard)/_components/kpis/Ticket';
import { format } from 'date-fns';
import { Suspense } from 'react';

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open || 'true';
	const preSet = searchParams.set || '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	const data = await getCompanyAction(preSet);

	const customData = await getCompanyCustomAction(
		formattedStartDate!,
		formattedEndDate!,
	);

	async function getData() {
		if (startDate && endDate) {
			return customData;
		} else {
			return data;
		}
	}

	const resp = await getData();

	return resp ? (
		<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
			<div
				className={`relative  ${
					open == 'true' ? 'md:max-w-[82vw] ' : 'md:max-w-[90vw]'
				}   flex md:ml-auto  w-full `}>
				<div
					className={`bg-zinc-950/50 py-4 w-full ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2 `}>
					<h2 className='text-zinc-50 font-bold md:text-3xl text-center py-1.5 text-xl'>
						Visão Geral - <span className='text-violet-400'>Lush Ipiranga</span>
					</h2>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-36'>
					<Suspense fallback='...carregando'>
						<BigNumbers
							data={resp?.BigNumbers}
							description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
								preSet == '30days' ? '30 dias atrás ' : ''
							} ${preSet == '6months' ? '6 meses atrás ' : ''}${
								preSet == '12months' ? '12 meses atrás ' : ''
							}`}
						/>
					</Suspense>
					<div className='flex w-full gap-5 h-full'>
						<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
							<Suspense fallback='...carregando'>
								<InvoicingXLocation data={data?.BillingRentalType} />
							</Suspense>
						</div>
					</div>
					<div className='gap-5 h-full w-full flex flex-col md:flex-row justify-between '>
						<div className='md:w-1/3 w-full'>
							<Suspense fallback='...carregando'>
								<Categories data={data?.RevenueBySuiteCategory} />
							</Suspense>
						</div>

						<div className='md:w-2/3 w-full h-full flex gap-5 justify-between flex-col '>
							<Suspense fallback='...carregando'>
								<TRevPar data={data?.TrevparByDate} />
								<RevPar data={data?.RevparByDate} />
							</Suspense>
						</div>
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<Suspense fallback='...carregando'>
							<Invoicing data={data?.RevenueByDate} />
						</Suspense>
						<Suspense fallback='...carregando'>
							<Locations data={data?.RentalsByDate} />
						</Suspense>
						<Suspense fallback='...carregando'>
							<Ticket data={data?.TicketAverageByDate} />
						</Suspense>
					</div>
					<div className='flex flex-col  h-full w-full gap-5'>
						<Suspense fallback='...carregando'>
							<Occupation data={data?.OccupancyRateByDate} />
						</Suspense>
						<Suspense fallback='...carregando'>
							<OccupationCasaLush data={data?.OccupancyRateBySuiteCategory} />
						</Suspense>
					</div>
					<div className='w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between'>
						<div className='w-full'>
							<Suspense fallback='...carregando'>
								<TableKpiCategory
									dataTable={data?.DataTableSuiteCategory}
									datatableResult={data?.TotalResult}
								/>
							</Suspense>
						</div>
					</div>
					<div className='flex gap-5 flex-col w-full'>
						<Suspense fallback='...carregando'>
							<TableKpiGiro data={data?.DataTableGiroByWeek} />
						</Suspense>
						<Suspense fallback='...carregando'>
							<TableKpiOccupation data={data?.DataTableOccupancyRateByWeek} />
						</Suspense>
					</div>
				</div>
			</div>
		</main>
	) : (
		<></>
	);
}
