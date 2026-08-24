/** @format */
'use client';

import { useIntentPrefetch } from '@/hooks/use-intent-prefetch';
import Link from 'next/link';
import React from 'react';

interface BtnSidebarMenuProps {
	children: React.ReactNode;
	icon: React.ReactNode;
	selected: string;
	openned: boolean;
	href: string;
	role: string;
	disabled?: boolean;
}

export default function BtnSidebarMenu(props: BtnSidebarMenuProps) {
	const isActive = props.selected == props.role;
	const intent = useIntentPrefetch();
	const canPrefetch = !props.disabled && !isActive;
	const className = `p-2 flex gap-3 rounded ${
		props.disabled
			? 'bg-transparent text-zinc-400 opacity-50 cursor-not-allowed'
			: isActive
				? 'bg-violet-400 text-zinc-900'
				: ' bg-zinc-800 hover:bg-zinc-700 text-zinc-50'
	}   ${props.openned ? 'justify-between' : 'justify-center'} font-semibold items-center transition-all duration-300 ease-linear`;

	if (props.disabled) {
		return (
			<span
				aria-disabled='true'
				className={className}>
				{props.openned ? props.children : null}
				{props.icon}
			</span>
		);
	}

	return (
		<Link
			prefetch={false}
			href={props.href}
			className={className}
			onPointerEnter={() => intent.schedule(props.href, canPrefetch)}
			onPointerLeave={() => intent.cancel(props.href)}
			onPointerDown={() => intent.cancel(props.href)}
			onFocus={() => intent.prefetchNow(props.href, canPrefetch)}>
			{props.openned ? props.children : null}
			{props.icon}
		</Link>
	);
}
