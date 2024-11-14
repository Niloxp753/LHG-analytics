/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';

import { AReports } from '../../components/kpis/AReports';
import { BReports } from '../../components/kpis/BReports';
import CategoryA from '../../components/kpis/CategoryA';
import CategoryB from '../../components/kpis/CategoryB';
import Cmv from '../../components/kpis/cmv';
import CoustDayXWorker from '../../components/kpis/CoustDayXWorker';
import CoustXAB from '../../components/kpis/CoustXAB';
import CoustXWorker from '../../components/kpis/CoustXWorker';
import { CReports } from '../../components/kpis/CReports';
import { MinusSell } from '../../components/kpis/MinusSell';
import { MostSell } from '../../components/kpis/MostSell';
import RevenueABXCost from '../../components/kpis/revenueABXCost';
import RevenuePercent from '../../components/kpis/RevenuePercent';
import RevenueXGroup from '../../components/kpis/RevenueXGroup';
import TKTXLocation from '../../components/kpis/TKTXLocation';

export default function Restaurant({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const open = searchParams.open || 'true';

	return (
		<main className='flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-5 py-10'>
			<div
				className={`relative w-full ${
					open == 'true' ? 'max-w-[82vw]' : 'max-w-[90vw]'
				}  ml-auto flex `}>
				<div
					className={`bg-zinc-950/50 py-4 ml-auto ${
						open == 'true' ? 'w-[82vw]' : 'w-[90vw] '
					} backdrop-blur-md fixed z-50 top-0 flex flex-col gap-2 justify-end `}>
					<h2 className='text-zinc-50 font-bold text-3xl'>
						Painel de <span className='text-violet-400'>Restaurantes</span>
					</h2>
				
				</div>
				<div className=' w-full  flex gap-5 flex-col justify-start mt-60'>
					<div className='flex w-full gap-5 h-[320px]'>
						<div className='h-full w-full flex items-center justify-center'>
							<RevenueABXCost />
						</div>
					</div>
					<div className='h-full w-full flex items-center justify-center'>
						<Cmv />
					</div>
					<div className='gap-5 h-fit w-full flex justify-between flex-col xl:flex-row'>
						<RevenuePercent />
						<TKTXLocation />
					</div>
					<div className='flex items-center justify-between gap-5 h-full w-full'>
						<div className='w-1/2 h-full'>
							<MostSell />
						</div>
						<div className='w-1/2 h-full'>
							<MinusSell />
						</div>
					</div>
					<div className='flex flex-col gap-5 mb-5'>
						<RevenueXGroup />
						<CategoryA />
						<CategoryB />
						<div className='flex items-start gap-5'>
							<BReports />
							<CReports />
						</div>
						<AReports />
						<div className='flex flex-col gap-5'>
							<h2 className='text-zinc-50 font-bold text-2xl mt-10'>
								Gastos E Custos Gerais
							</h2>
							<CoustDayXWorker />
							<CoustXWorker />
							<div className='flex-col xl:flex-row flex gap-5'>
								<div className='w-full'>
									<CoustXAB />
								</div>
								<div className='xl:w-1/3 flex xl:flex-col justify-between gap-5'>
									<CardDetails
										title={'Compras Enxoval A&B - 2023'}
										value={'R$44.554'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Enxoval A&B - 2024'}
										value={'R$15.948'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Utensílios - 2023'}
										value={'R$20.083'}
										icon={undefined}
									/>
									<CardDetails
										title={'Compras Utensílios - 2024'}
										value={'R$1.943'}
										icon={undefined}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
