/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { DataTableDemo } from './_components/dataTable';
import WelcomeMessage from './_components/WelcomeMessage';

function SettingsDataFallback() {
	return (
		<div
			className='w-full space-y-4 px-3 md:pr-10'
			data-testid='settings-data-loading'>
			<div className='flex items-center justify-between gap-5 py-4'>
				<Skeleton className='h-10 w-64' />
				<Skeleton className='h-10 w-32' />
			</div>
			<Skeleton className='h-80 w-full rounded-md' />
		</div>
	);
}

async function SettingsData() {
	const users = await getAllUsersAction();

	return users && <DataTableDemo data={users} />;
}

export default function Page() {
	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-start bg-zinc-950 overflow-x-hidden pt-24 pb-10 md:px-5'>
			<div
				className={` 
				md:max-w-[82vw]	 md:ml-auto w-full bg-zinc-950 h-full relative`}>
				<div
					className={`bg-zinc-950/50 py-4 md:w-[82vw] backdrop-blur-md fixed z-40 top-0 flex flex-col items-center md:items-start gap-5 w-full `}>
					<WelcomeMessage />
				</div>
				<div>
					<Suspense fallback={<SettingsDataFallback />}>
						<SettingsData />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
