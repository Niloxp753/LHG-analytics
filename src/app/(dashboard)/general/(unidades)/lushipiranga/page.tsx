/** @format */

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
import { getCompanyAction } from '@/actions/getCompany';

export default async function LushIpiranga({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const open = searchParams.open || 'true';
	const preSet = searchParams.set || '7days';

	const data = await getCompanyAction(preSet);

	return (
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
				<div className=' w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-28'>
					<BigNumbers
						data={data.BigNumbers}
						description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
							preSet == '30days' ? '30 dias atrás ' : ''
						} ${preSet == '6months' ? '6 meses atrás ' : ''}${
							preSet == '12months' ? '12 meses atrás ' : ''
						}`}
					/>
					<div className='flex w-full gap-5 h-full'>
						<div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
							<InvoicingXLocation data={data.BillingRentalType} />
						</div>
					</div>
					<div className='gap-5 h-full w-full flex flex-col md:flex-row justify-between '>
						<div className='md:w-1/3 w-full'>
							<Categories data={data.RevenueBySuiteCategory} />
						</div>

						<div className='md:w-2/3 w-full h-full flex gap-5 justify-between flex-col '>
							<TRevPar data={data.TrevparByDate} />
							<RevPar data={data.RevparByDate} />
						</div>
					</div>
					<div className='flex gap-5 flex-col items-center'>
						<Invoicing data={data.RevenueByDate} />
						<Locations data={data.RentalsByDate} />
						<Ticket data={data.TicketAverageByDate} />
					</div>
					<div className='flex flex-col  h-full w-full gap-5'>
						<Occupation data={data.OccupancyRateByDate} />
						<OccupationCasaLush data={data.OccupancyRateBySuiteCategory} />
					</div>
					<div className='w-full h-full flex-col gap-5 md:flex-row flex items-baseline justify-between'>
						<div className='w-full'>
							<TableKpiCategory
								dataTable={data.DataTableSuiteCategory}
								datatableResult={data.TotalResult}
							/>
						</div>
					</div>
					<div className='flex gap-5 flex-col w-full'>
						<TableKpiGiro data={data.DataTableGiroByWeek} />
						<TableKpiOccupation data={data.DataTableOccupancyRateByWeek} />
					</div>
				</div>
			</div>
		</main>
	);
}
