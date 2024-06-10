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
}

export default function CardDetails({
	title,
	value,
	icon,
	type,
}: CardDetailsProps) {
	return (
		<div>
			<Card className='text-zinc-50 min-w-[28vh] w-full h-fit border border-zinc-100/40 bg-zinc-900'>
				<CardHeader>
					<CardTitle className='text-xl flex gap-3 items-center'>
						{icon}
						{title}
					</CardTitle>
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
		</div>
	);
}
