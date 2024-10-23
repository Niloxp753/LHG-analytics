/** @format */

import { getServerSession } from 'next-auth';
import { DataTableDemo } from './components/dataTable';
import { getAllUsersAction } from '@/actions/getAllUsers';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const session = await getServerSession();

	let open = searchParams.open || 'true';

	const data = await getAllUsersAction();

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10 '>
			<div
				className={`  ${
					open == 'true' ? 'md:max-w-[82vw]' : 'md:max-w-[90vw]'
				}  md:ml-auto w-full bg-zinc-950 h-full relative`}>
				<div
					className={`bg-zinc-950/50 py-4   ${
						open == 'true' ? 'md:w-[82vw]' : 'md:w-[90vw] '
					} backdrop-blur-md fixed z-40 top-0 flex flex-col items-center md:items-start gap-5 w-full `}>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center md:text-start pt-1.5 px-3'>
						Bem Vindo -{' '}
						<span className='text-violet-400'>{session?.user?.name}</span>
					</h2>
				</div>
				<div className='mt-14'>{data && <DataTableDemo data={data} />}</div>
			</div>
		</main>
	);
}
