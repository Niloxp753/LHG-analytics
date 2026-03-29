/** @format */

import logo from '@/assets/images/logo-analytics.png';
import { LogoImage } from '@/components/ui/logo-image';

export default function Loading() {
	return (
		<div className='w-full h-screen bg-zinc-950/80 flex items-center justify-center'>
			<LogoImage
				containerClassName='animate-pulse'
				src={logo}
				alt={'Logo LHG Analytics'}
				boxWidth={360}
				boxHeight={200}
				sizes='360px'
				priority
			/>
		</div>
	);
}
