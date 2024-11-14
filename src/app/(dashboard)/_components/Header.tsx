/** @format */
'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FormFilter from './FormFilter';
import LinkPreSet from './LinkPreSet';

export default function Header() {
	const searchParams = useSearchParams();
	const [tab, setTab] = useState('7days');
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	const links = [
		{ label: 'ÚLTIMOS 7 DIAS', tag: '7days' },
		{ label: 'ÚLTIMOS 30 DIAS', tag: '30days' },
		{ label: 'ÚLTIMOS 6 MESES', tag: '6months' },
	];

	return (
		<div className=' pt-1 pb-1 w-full px-4'>
			<div
				className={`flex gap-5 items-end justify-between md:justify-center w-full flex-col md:flex-row `}>
				<div className='flex justify-between md:justify-start md:gap-5 w-full text-zinc-100 text-xs md:text-sm'>
					{links.map((l, index) => {
						return (
							<LinkPreSet
								onClick={() => {
									setTab(l.tag);
								}}
								tag={l.tag}
								key={index}
								preSet={preSet}
								label={l.label}
								href={`?menu=${selected}&open=${openned}&set=${l.tag}`}></LinkPreSet>
						);
					})}
				</div>
				<div className='hidden md:flex'>
					<FormFilter />
				</div>
			</div>
		</div>
	);
}
