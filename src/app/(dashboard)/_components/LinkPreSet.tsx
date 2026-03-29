/** @format */
'use client';
import { Loader2 } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LinkPreSetProps extends Omit<LinkProps, 'href'> {
	href: string;
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
	href,
	...props
}: LinkPreSetProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const isActive = preSet == tag && startDate == '';
	const content = isPending ? <Loader2 className='size-4 animate-spin' /> : label;
	const className = `lg:w-fit uppercase my-2 lg:my-0 min-w-28 w-full text-sm lg:text-xs text-nowrap disabled:opacity-50  cursor-pointer  border flex gap-2 ${
		isActive ? 'bg-violet-400 text-zinc-900 ' : 'text-zinc-50 bg-transparent'
	} border-violet-400 ${
		isPending && 'bg-violet-400 grayscale opacity-50'
	}  py-2.5 px-1 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold flex items-center justify-center`;

	if (isActive) {
		return (
			<span
				aria-current='page'
				className={className}>
				{content}
			</span>
		);
	}

	return (
		<Link
			href={href}
			onMouseEnter={() => router.prefetch(href)}
			onFocus={() => router.prefetch(href)}
			prefetch={false}
			onClick={(event) => {
				onClick?.(event);
				startTransition(() => {});
			}}
			{...props}
			className={className}>
			{content}
		</Link>
	);
}
