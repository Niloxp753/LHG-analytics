'use client';

import { Separator } from '@/components/ui/separator';
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import FormFilter from './FormFilter';
import PeriodSelector from './PeriodSelector';

type MobileFilterContentProps = {
	onNavigate(): void;
};

export default function MobileFilterContent({
	onNavigate,
}: MobileFilterContentProps) {
	return (
		<SheetContent
			onClick={(event) => event.stopPropagation()}
			side='right'
			data-testid='mobile-filter-content'
			className='dark w-full z-[51]'>
			<SheetHeader>
				<SheetTitle className='text-xl'>Filtrar por data</SheetTitle>
			</SheetHeader>
			<div className='mt-10 flex flex-col gap-2.5 z-[70]'>
				<PeriodSelector onNavigate={onNavigate} />
				<Separator className='my-5' />
				<FormFilter popoverPortalled={false} />
			</div>
		</SheetContent>
	);
}
