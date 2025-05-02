/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
				{description && (
					<CardDescription className='text-muted-foreground'>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{type == 'money' ? (
					<p className='flex gap-1 items-center'>
						{value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
				) : type == 'percent' ? (
					<p className='flex gap-1 items-center'>
						{(Number(value) * 100).toFixed(2) + '%'}
					</p>
				) : (
					<p>{value.toLocaleString('pt-BR')}</p>
				)}
			</CardContent>
		</Card>
	) : (
		<Skeleton />
	);
}
