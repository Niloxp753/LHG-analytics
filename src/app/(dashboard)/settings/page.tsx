/** @format */

import { DataTableDemo } from './components/dataTable';

export default function Page() {
	return (
		<main>
			<div className='h-screen px-10 bg-zinc-950 text-zinc-50 flex\ w-full flex-col'>
				<div className=' p-4'>
					<h2 className='text-center text-3xl font-bold'>
						Bem Vindo <span className='text-violet-400'>Administrador</span>
					</h2>
				</div>
				<div className='flex mx-10 w-[90%]'>
					<DataTableDemo />
				</div>
			</div>
		</main>
	);
}
