/** @format */

import { DataTableDemo } from './components/dataTable';
import { getServerSession } from 'next-auth';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const session = await getServerSession();
	let open = searchParams.open || 'true';

	return (
		<main className='w-full bg-zinc-950 overflow-hidden '>
			<div
				className={` w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div className='h-screen bg-zinc-950 text-zinc-50 flex w-full flex-col py-5'>
					<h2 className='text-start text-3xl font-bold pr-10'>
						Bem Vindo{' '}
						<span className='text-violet-400'>{session?.user?.name}</span>
					</h2>

					<DataTableDemo />
				</div>
			</div>
		</main>
	);
}
