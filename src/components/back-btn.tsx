/** @format */

'use client';

import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { UNIT_SLUG_TO_UNIT } from '@/lib/access-control';

export default function BackBtn() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const menu = searchParams.get('menu');

	const segments = pathname.split('/').filter(Boolean);
	const unitSlug = segments[1] ?? null;
	const canShow = Boolean(
		unitSlug && Object.prototype.hasOwnProperty.call(UNIT_SLUG_TO_UNIT, unitSlug),
	);
	const href = menu ? `/${menu}` : segments[0] ? `/${segments[0]}` : '/';

	return (
		canShow && (
			<Button
				size={'icon'}
				className='z-50 fixed top-4 left-12 bg-transparent'
				asChild>
				<Link href={href}>
					<Undo2 size={20} />
				</Link>
			</Button>
		)
	);
}
