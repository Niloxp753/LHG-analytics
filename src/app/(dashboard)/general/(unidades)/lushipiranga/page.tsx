/** @format */

import { getCompanyAction } from '@/_actions/getCompany';
import { getCompanyCustomAction } from '@/_actions/getCompanyCustom';
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

export const revalidate = 0;

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open ?? 'true';
	const preSet = searchParams.set ?? '7days';
	const startDate = searchParams.startDate;
	const endDate = searchParams.endDate;

	const formattedStartDate =
		startDate && format(new Date(startDate!), 'dd/MM/yyyy');
	const formattedEndDate = endDate && format(new Date(endDate!), 'dd/MM/yyyy');

	async function getData() {
		if (startDate && endDate) {
			const customData = await getCompanyCustomAction(
				formattedStartDate!,
				formattedEndDate!,
			);
			if (customData) {
				return customData;
			}
		} else {
			const data = await getCompanyAction(preSet ?? '7days');
			if (data) {
				return data;
			}
		}
	}

	const resp = await getData();

	return (
		<>
			{resp ? (
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
								Visão Geral -{' '}
								<span className='text-violet-400'>Lush Ipiranga</span>
							</h2>
							<Header />
						</div>
						<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-36'>
							<BigNumbers
								data={resp?.BigNumbers}
								description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
									preSet == '30days' ? '30 dias atrás ' : ''
								} ${preSet == '6months' ? '6 meses atrás ' : ''}${
									preSet == '12months' ? '12 meses atrás ' : ''
								}`}
							/>
							<div className='flex w-full gap-5 h-full'>
								<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
									<InvoicingXLocation data={resp?.BillingRentalType} />
								</div>
							</div>
							<div className='gap-5 h-full w-full flex flex-col md:flex-row justify-between '>
								<div className='md:w-1/3 w-full'>
									<Categories data={resp?.RevenueBySuiteCategory} />
								</div>
								<div className='md:w-2/3 w-full h-full flex gap-5 justify-between flex-col '>
									<TRevPar data={resp?.TrevparByDate} />
									<RevPar data={resp?.RevparByDate} />
								</div>
							</div>
							<div className='flex gap-5 flex-col items-center'>
								<Invoicing data={resp?.RevenueByDate} />
								<Locations data={resp?.RentalsByDate} />
								<Ticket data={resp?.TicketAverageByDate} />
							</div>
							<div className='flex flex-col  h-full w-full gap-5'>
								<Occupation data={resp?.OccupancyRateByDate} />
								<OccupationCasaLush data={resp?.OccupancyRateBySuiteCategory} />
							</div>
							<div className='w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between'>
								<div className='w-full'>
									<TableKpiCategory
										dataTable={resp?.DataTableSuiteCategory}
										datatableResult={resp?.TotalResult}
									/>
								</div>
							</div>
							<div className='flex gap-5 flex-col w-full'>
								<TableKpiGiro data={resp?.DataTableGiroByWeek} />
								<TableKpiOccupation data={resp?.DataTableOccupancyRateByWeek} />
							</div>
						</div>
					</div>
				</main>
			) : (
				<main className='flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5'>
					<h3>Carregando dados...</h3>
				</main>
			)}
			;
		</>
	);
}
