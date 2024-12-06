/** @format */
'use client';
import { Loader2 } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useTransition } from 'react';

interface LinkPreSetProps extends LinkProps {
	preSet: string;
	label: string;
	tag: string;
	startDate: string | null;
}

export default function LinkPreSet({
	preSet,
	label,
	tag,
	startDate,
	onClick,
	...props
}: LinkPreSetProps) {
	const [isPending, startTransition] = useTransition();

	return (
		<Link
			onClick={() => {
				startTransition(() => {});
			}}
			{...props}
			className={`w-fit min-w-28 text-xs disabled:opacity-50  cursor-pointer  border flex gap-2 ${
				preSet == tag && startDate == ''
					? 'bg-violet-400 text-zinc-900 '
					: 'text-zinc-50 bg-transparent'
			} border-violet-400 ${
				isPending && 'bg-violet-400 grayscale opacity-50'
			}  py-2 px-1 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold flex items-center justify-center`}>
			{isPending ? <Loader2 className='size-4 animate-spin' /> : label}
		</Link>
	);
}
