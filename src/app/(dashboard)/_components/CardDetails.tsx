/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MoveDown, MoveUp } from 'lucide-react';

interface CardDetailsProps {
	title: string;
	value: number | string;
	icon: any;
	type?: string;
	description?: string;
}

export default function CardDetails({
	title,
	value,
	icon,
	type,
	description,
}: CardDetailsProps) {
	return value ? (
		<Card className='text-zinc-50 w-full h-fit border-none bg-gradient-to-br from-zinc-800 to-zinc-900 '>
			<CardHeader>
				<CardTitle className='text-lg flex md:items-center justify-between flex-row gap-5'>
					{title}
					{icon}
				</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				{type == 'money' ? (
					<p className='flex gap-1 items-center'>
						{value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}

						{/* <MoveDown
							className='drop-shadow-[0px_4px_8px_rgba(239,68,68)]'
							color='#ef4444'
							size={16}
						/> */}
					</p>
				) : (
					<p className='flex gap-1 items-center'>
						{value}
						{/* <MoveUp
							className='drop-shadow-[0px_4px_8px_rgba(34,197,94)]'
							color='#22c55e'
							size={16}
						/> */}
					</p>
				)}
			</CardContent>
		</Card>
	) : (
		<Skeleton />
	);
}
