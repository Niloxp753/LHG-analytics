/** @format */

import { getAllUsersAction } from '@/_actions/getAllUsers';
import { getServerSession } from 'next-auth';
import { DataTableDemo } from './_components/dataTable';
import { redirect } from 'next/navigation';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const session = await getServerSession();

	const users = await getAllUsersAction();
	const emailLogged = session?.user?.email;

	const user = users?.find((u) => u.email === emailLogged);

	if (user?.role !== 'ADMIN') {
		redirect('/general?menu=general');
	}

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10 '>
			<div
				className={` 
				md:max-w-[82vw]	 md:ml-auto w-full bg-zinc-950 h-full relative`}>
				<div
					className={`bg-zinc-950/50 py-4 md:w-[82vw] backdrop-blur-md fixed z-40 top-0 flex flex-col items-center md:items-start gap-5 w-full `}>
					<h2 className='text-zinc-50 font-bold text-xl md:text-3xl text-center md:text-start pt-1.5 px-3'>
						Bem Vindo -{' '}
						<span className='text-violet-400'>{session?.user?.name}</span>
					</h2>
				</div>
				<div className='mt-14'>{users && <DataTableDemo data={users} />}</div>
			</div>
		</main>
	);
}
