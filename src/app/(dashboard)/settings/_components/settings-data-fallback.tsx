/** @format */

import { Skeleton } from '@/components/ui/skeleton';

export function SettingsDataFallback() {
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
