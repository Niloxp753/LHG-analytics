/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DiamondPercent,
	Eye,
	HandCoins,
	Leaf,
	LeafyGreen,
	Sigma,
	SquarePercent,
} from 'lucide-react';

interface BigNumbersProps {
	data?: any[];
	description: string;
}

export default function BigNumbers({ description, data }: BigNumbersProps) {
	return (
		<>
			{data?.map((d, index) => {
				return (
					<div
						key={index}
						className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
						<CardDetails
							type='money'
							description={
								d.PreviousDate &&
								description +
									d.PreviousDate.totalAllValuePreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<HandCoins />}
							title={'Receita de A&B'}
							value={d.currentDate.totalAllValue}
							Badge={
								d.PreviousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllValue}
										previousVal={d.PreviousDate.totalAllValuePreviousData}
									/>
								)
							}
						/>
						<CardDetails
							description={
								d.PreviousDate &&
								description +
									d.PreviousDate.totalAllSalesPreviousData.toLocaleString(
										'pt-BR',
									)
							}
							icon={<Sigma />}
							title={'Nº de Vendas'}
							value={d.currentDate.totalAllSales}
							Badge={
								d.PreviousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllSales}
										previousVal={d.PreviousDate.totalAllSalesPreviousData}
									/>
								)
							}
						/>
						<CardDetails
							type='money'
							description={
								d.PreviousDate &&
								description +
									d.PreviousDate.totalAllTicketAveragePreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<SquarePercent />}
							title={'Ticket Médio A&B'}
							value={d.currentDate.totalAllTicketAverage}
							Badge={
								d.PreviousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllTicketAverage}
										previousVal={
											d.PreviousDate.totalAllTicketAveragePreviousData
										}
									/>
								)
							}
						/>
						<CardDetails
							type='money'
							description={
								d.PreviousDate &&
								description +
									d.PreviousDate.totalAllTicketAverageByTotalRentalsPreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<DiamondPercent />}
							title={'TKT Médio A&B / Locação'}
							value={d.currentDate.totalAllTicketAverageByTotalRentals}
							Badge={
								d.PreviousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllTicketAverageByTotalRentals}
										previousVal={
											d.PreviousDate
												.totalAllTicketAverageByTotalRentalsPreviousData
										}
									/>
								)
							}
						/>
					</div>
				);
			})}
		</>
	);
}
