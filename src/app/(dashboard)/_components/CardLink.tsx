/** @format */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowBigRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTransition } from 'react';

interface CardLinkProps {
	href: string;
	title: string;
	content: React.ReactNode;
}

export default function CardLink(props: CardLinkProps) {
	const [isPending, startTransition] = useTransition();

	return (
		<div
			onClick={() => {
				startTransition(() => {});
			}}
			data-title={props.title}
			className={`data-[title='Lush Ipiranga']:opacity-10`}>
			{props.title !== 'Lush Ipiranga' ? (
				<div className='w-full min-h-24 h-full bg-zinc-600/10 flex items-center justify-center text-zinc-50/50'>
					{props.title} - Aguardando integração...
				</div>
			) : (
				<Link
					prefetch
					href={props.href}
					className={`bg-zinc-800 ${isPending && 'opacity-50 grayscale'}`}>
					<Card className='bg-gradient-to-br from-zinc-800 to-zinc-900 border-transparent text-zinc-100 hover:bg-zinc-700 duration-300 transition-all ease-linear hover:border-violet-400'>
						<CardHeader>
							<CardTitle className={`flex items-center justify-between `}>
								{props.title}
								{isPending ? (
									<Loader2 className='size-5 animate-spin' />
								) : (
									<ArrowBigRight className='size-8 text-violet-400' />
								)}
							</CardTitle>
						</CardHeader>
						<CardContent>{props.content}</CardContent>
					</Card>
				</Link>
			)}
		</div>
	);
}
