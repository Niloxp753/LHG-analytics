/** @format */

import React from 'react';
import { DataTableDemo } from './components/dataTable';
import Sidebar from '@/components/sidebar';

export default function Page() {
	return (
		<div className='h-screen px-10 bg-zinc-950 text-zinc-50 flex relative justify-between w-full'>
			<div>
				<Sidebar />
			</div>
			<div className='flex mx-10 w-full'>
				<DataTableDemo />
			</div>
		</div>
	);
}
