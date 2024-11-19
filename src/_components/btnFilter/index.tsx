/** @format */

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BtnFilterProps {
	children: React.ReactNode;
	href: string;
}

export default function BtnFilter(props: BtnFilterProps) {
	return (
		<>
			<Link
				href={props.href}
				className='p-3 bg-zinc-950 justify-between items-center rounded-xl flex gap-4 text-lg font-medium  hover:bg-zinc-900 transition-all duration-300 ease-linear'>
				{props.children}
				<ChevronDown />
			</Link>
		</>
	);
}
