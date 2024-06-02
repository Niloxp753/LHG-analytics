/** @format */

import Header from '../components/Header';
import Categories from '../components/kpis/Categories';
import Invoicing from '../components/kpis/Invoicing';
import LocationXRevPar from '../components/kpis/LocationXRevPar';
import TicketXTRevPar from '../components/kpis/TicketXTRevPar';

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
					className={`bg-zinc-950 py-2 ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-2 flex flex-col gap-5 justify-end`}>
					<Header />
				</div>
				<div className=' w-full h-full flex gap-2 flex-col justify-start mt-48'>
					<Invoicing />
					<div className='gap-2 h-full w-full flex justify-between'>
						<TicketXTRevPar />
						<LocationXRevPar />
					</div>
					<div className='flex h-full w-full gap-2'>
						<div className='w-1/3 h-full'>
							<Categories />
						</div>
						<div className='flex flex-col w-2/3 gap-2'>
							<div className='w-full h-full'>
								<LocationXRevPar />
							</div>
							<div className='w-full h-full'>
								<LocationXRevPar />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
