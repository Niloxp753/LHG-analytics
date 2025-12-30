/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import { DataTableDemo } from './_components/dataTable';
import WelcomeMessage from './_components/WelcomeMessage';

export default async function Page() {
	const users = await getAllUsersAction();

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden md:px-5 py-10 '>
			<div
				className={` 
				md:max-w-[82vw]	 md:ml-auto w-full bg-zinc-950 h-full relative`}>
				<div
					className={`bg-zinc-950/50 py-4 md:w-[82vw] backdrop-blur-md fixed z-40 top-0 flex flex-col items-center md:items-start gap-5 w-full `}>
					<WelcomeMessage />
				</div>
				<div className='mt-14'>{users && <DataTableDemo data={users} />}</div>
			</div>
		</main>
	);
}
