/** @format */

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import React from 'react';

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
	return (
		<Card className='text-zinc-50 w-full h-fit border-none bg-gradient-to-br from-zinc-800 to-zinc-900 '>
			<CardHeader>
				<CardTitle className='text-xl flex gap-3 items-center justify-between'>
					{title}
					{icon}
				</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				{type == 'money' ? (
					<p>
						{value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
				) : (
					<p>{value}</p>
				)}
			</CardContent>
		</Card>
	);
}
