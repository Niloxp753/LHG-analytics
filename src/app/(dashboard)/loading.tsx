/** @format */

import React from 'react';
import logo from '@/assets/images/logo-analytics.png';
import Image from 'next/image';

export default function Loading() {
	return (
		<div className='w-full h-screen bg-zinc-950/80 flex items-center justify-center'>
			<Image
				className='animate-pulse '
				src={logo}
				alt={'Logo LHG Analytics'}
				width={320}
				height={200}></Image>
		</div>
	);
}
