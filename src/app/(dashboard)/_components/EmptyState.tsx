/** @format */

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';

export default function EmptyState({
	title = 'Sem dados',
	description = 'Não encontramos dados para o período selecionado.',
	className,
	minHeight,
}: {
	title?: string;
	description?: string;
	className?: string;
	minHeight?: number;
}) {
	return (
		<Empty
			style={minHeight ? { minHeight } : undefined}
			className={cn(
				'w-full border border-dashed border-border/60 bg-muted/30 text-foreground',
				className,
			)}>
			<EmptyHeader>
				<EmptyTitle className='text-foreground'>{title}</EmptyTitle>
				<EmptyDescription className='text-muted-foreground'>
					{description}
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
