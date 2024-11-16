/** @format */

import Link from 'next/link';
import React from 'react';

interface BtnSidebarMenuProps {
	children: React.ReactNode;
	icon: any;
	selected: string;
	openned: string;
	href: string;
	role: string;
}

export default function BtnSidebarMenu(props: BtnSidebarMenuProps) {
	return (
		<Link
			prefetch
			href={props.href}
			className={`p-2 flex gap-3 ${
				props.selected == props.role
					? 'bg-violet-400 text-zinc-900'
					: ' bg-zinc-800 hover:bg-zinc-700 text-zinc-50'
			}   rounded ${
				props.openned == 'true' ? 'justify-between' : 'justify-center'
			} font-semibold items-center transition-all duration-300 ease-linear`}>
			{props.openned == 'true' ? props.children : null}
			{props.icon}
		</Link>
	);
}
