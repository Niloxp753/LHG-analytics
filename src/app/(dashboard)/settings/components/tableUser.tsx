/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { DataUser } from '@/constants/db-user';
import MenuOptions from './menuOptions';
import Image from 'next/image';

const data = [
	{
		id: 1,
		Categoria: 'Lush Pop',
		locations: '322',
		revenue: 79371,
		ticket: 246,
		giro: 1.07,
		trevpar: 265,
		tmo: '5:40:23',
		occupation: '26.38%',
	},
	{
		id: 2,
		Categoria: 'Lush',
		locations: '416',
		revenue: 122027,
		ticket: 293,
		giro: 1.73,
		trevpar: 508,
		tmo: '3:58:34',
		occupation: '30.47%',
	},
	{
		id: 3,
		Categoria: 'Lush Hidro',
		locations: '323',
		revenue: 131856,
		ticket: 409,
		giro: 1.79,
		trevpar: 733,
		tmo: '5:03:38',
		occupation: '40.71%',
	},
	{
		id: 4,
		Categoria: 'Lush Lounge',
		locations: '213',
		revenue: 98592,
		ticket: 463,
		giro: 1.78,
		trevpar: 822,
		tmo: '4:05:24',
		occupation: '32.77%',
	},
	{
		id: 5,
		Categoria: 'Lush Spa',
		locations: '689',
		revenue: 427370,
		ticket: 620,
		giro: 1.64,
		trevpar: 1018,
		tmo: '6:18:24',
		occupation: '47.87%',
	},
	{
		id: 6,
		Categoria: 'Lush Cine',
		locations: '107',
		revenue: 49488,
		ticket: 463,
		giro: 1.78,
		trevpar: 825,
		tmo: '5:34:35',
		occupation: '50.18%',
	},
	{
		id: 7,
		Categoria: 'Lush Splash',
		locations: '396',
		revenue: 395708,
		ticket: 998,
		giro: 1.47,
		trevpar: 1466,
		tmo: '6:48:51',
		occupation: '61.19%',
	},
	{
		id: 8,
		Categoria: 'Lush Spa Splash',
		locations: '335',
		revenue: 408104,
		ticket: 1218,
		giro: 1.6,
		trevpar: 1943,
		tmo: '7:48:46',
		occupation: '69.80%',
	},
	{
		id: 9,
		Categoria: 'Casa Lush',
		locations: '34',
		revenue: 80412,
		ticket: 2365,
		giro: 1.13,
		trevpar: 2680,
		tmo: '11:36:42',
		occupation: '40.33%',
	},
];

console.log(DataUser[0].avatar);
export function TableUser() {
	return (
		<div className='2xl:w-11/12 my-10 '>
			<>
				<MenuOptions />
				<Table className=' bg-zinc-900 rounded-lg'>
					<TableHeader className='bg-violet-900 rounded-lg'>
						<TableRow className='hover:bg-violet-900 rounded-lg transition-all duration-300 ease-linear text-center'>
							<TableHead>Avatar</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className='text-center'>Status</TableHead>
							<TableHead className='text-center'>E-mail</TableHead>
							<TableHead className='text-center'>Unidade</TableHead>
							<TableHead className='text-center'>Senha</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className='text-zinc-100'>
						{DataUser.map((user) => {
							return (
								<TableRow
									key={user.id}
									className='text-center'>
									<TableCell className='font-bold text-left'>
										<Image
											className='rounded-full'
											src={user.avatar}
											width={40}
											height={40}
											alt={user.name}></Image>
									</TableCell>
									<TableCell className='font-bold text-left'>
										{user.name}
									</TableCell>
									<TableCell>{user.status}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.unidade}</TableCell>
									<TableCell>{user.password}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</>
		</div>
	);
}
