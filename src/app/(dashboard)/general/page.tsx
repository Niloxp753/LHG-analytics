/** @format */

import Header from '../components/Header';
import Categories from '../components/kpis/InvoicingXCategories';
import Invoicing from '../components/kpis/Invoicing';
import InvoicingXUnity from '../components/kpis/InvoicingXUnity';
import LocationXRevPar from '../components/kpis/LocationXRevPar';
import TicketXTRevPar from '../components/kpis/TicketXTRevPar';
import TicketXRevPar from '../components/kpis/TicketXTRevPar';
import Occupation from '../components/kpis/Occupation';
import InvoicingXLocation from '../components/kpis/InvoicingXLocation';

export default function General({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let open = searchParams.open || 'true';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-2 justify-end `}>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-2 flex-col justify-start mt-44'>
					<div className='flex w-full gap-2 h-full'>
						<div className='h-full w-1/4 flex items-center justify-center'>
							<InvoicingXUnity />
						</div>
						<div className=' w-3/4'>
							<Invoicing />
						</div>
					</div>
					<div className='gap-2 h-full w-full flex justify-between'>
						<div className='w-1/3'>
							<Categories />
						</div>

						<div className='w-2/3 h-full gap-2 flex items-center justify-center flex-col'>
							<LocationXRevPar />
							<TicketXRevPar />
						</div>
					</div>
					<div className='flex h-full w-full gap-2'>
						<InvoicingXLocation />
						<Occupation />
					</div>
				</div>
			</div>
		</main>
	);
}
