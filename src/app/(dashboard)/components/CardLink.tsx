/** @format */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

interface CardLinkProps {
	href: string;
	title: string;
	content: React.ReactNode;
}

export default function CardLink(props: CardLinkProps) {
	return (
		<div
			data-title={props.title}
			className={`data-[title='Lush Ipiranga']:opacity-10`}>
			{props.title !== 'Lush Ipiranga' ? (
				<div className='w-full h-full bg-zinc-600/10 flex items-center justify-center'>
					Aguardando integração...
				</div>
			) : (
				<Link
					href={props.href}
					className='bg-zinc-800'>
					<Card className='bg-gradient-to-br from-zinc-800 to-zinc-900 border-transparent text-zinc-100 hover:bg-zinc-700 duration-300 transition-all ease-linear hover:border-violet-400'>
						<CardHeader>
							<CardTitle>{props.title}</CardTitle>
						</CardHeader>
						<CardContent>{props.content}</CardContent>
					</Card>
				</Link>
			)}
		</div>
	);
}
