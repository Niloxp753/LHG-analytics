/** @format */

'use client';

import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname, useSearchParams } from 'next/navigation';

export default function BackBtn() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const menu = searchParams.get('menu');

	const canShow =
		pathname.includes('/lushipiranga') ||
		pathname.includes('/lushlapa') ||
		pathname.includes('/tout') ||
		pathname.includes('/andardecima');

	return (
		canShow && (
			<Button
				size={'icon'}
				className='z-50 fixed top-4 left-12 bg-transparent'
				asChild>
				<Link href={`/${menu}`}>
					<Undo2 size={20} />
				</Link>
			</Button>
		)
	);
}
