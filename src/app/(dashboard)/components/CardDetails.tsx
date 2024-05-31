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
	value: number;
}

export default function CardDetails({ title, value }: CardDetailsProps) {
	return (
		<div>
			<Card className='bg-transparent text-zinc-50 w-[228px] h-[112px] border border-zinc-100/40 bg-zinc-800'>
				<CardHeader>
					<CardTitle className='text-xl'>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						{value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
