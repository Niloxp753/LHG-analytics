/** @format */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { canAccessRoute } from '@/lib/access-control';
import { useSessionStore } from '@/stores/session-store';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

interface CardLinkProps {
	href: string;
	title: string;
	content: React.ReactNode;
	disabled?: boolean;
}

export default function CardLink(props: CardLinkProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const status = useSessionStore((s) => s.status);
	const user = useSessionStore((s) => s.user);
	const isDisabled =
		props.disabled ?? (status !== 'authed' || !canAccessRoute(user, props.href));
	const linkClassName = `bg-zinc-800 ${
		isPending && !isDisabled ? 'opacity-50 grayscale' : ''
	} ${isDisabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}`;
	const cardClassName = `bg-gradient-to-br from-zinc-800 to-zinc-900 border-transparent text-zinc-100 transition-all ease-linear ${
		isDisabled ? '' : 'hover:bg-zinc-700 duration-300 hover:border-violet-400'
	}`;
	const iconClassName = `size-8 ${
		isDisabled ? 'text-zinc-500' : 'text-violet-400'
	}`;
	const contentNode = (
		<Card className={cardClassName}>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					{props.title}
					{isPending && !isDisabled ? (
						<Loader2 className='size-5 animate-spin' />
					) : (
						<ArrowUpRight className={iconClassName} />
					)}
				</CardTitle>
			</CardHeader>
			<CardContent>{props.content}</CardContent>
		</Card>
	);

	return (
		<div
			onClick={() => {
				if (isDisabled) {
					return;
				}
				startTransition(() => {});
			}}
			data-title={props.title}>
			{isDisabled ? (
				<div
					aria-disabled='true'
					className={linkClassName}>
					{contentNode}
				</div>
			) : (
				<Link
					onMouseEnter={() => router.prefetch(props.href)}
					onFocus={() => router.prefetch(props.href)}
					prefetch={false}
					href={props.href}
					className={linkClassName}>
					{contentNode}
				</Link>
			)}
		</div>
	);
}
