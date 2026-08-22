/** @format */

import { Suspense } from 'react';
import { SettingsData } from './_components/settings-data';
import { SettingsDataFallback } from './_components/settings-data-fallback';
import WelcomeMessage from './_components/WelcomeMessage';

export const instant = true;

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
