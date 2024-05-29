/** @format */

import React from 'react';
import { DataTableDemo } from './components/dataTable';
import Sidebar from '@/app/(dashboard)/components/sidebar';

export default function Page() {
	return (
		<div className='h-screen px-10 bg-zinc-950 text-zinc-50 flex relative w-full flex-col'>
			<div className=' p-4'>
				<h2 className='text-center text-3xl font-bold'>
					Bem Vindo <span className='text-violet-400'>Administrador</span>
				</h2>
			</div>
			<Sidebar />
			<div className='flex mx-10 w-[90%]'>
				<DataTableDemo />
			</div>
		</div>
	);
}
