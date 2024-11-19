/** @format */

'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/_lib/utils';
import { Button } from '@/_components/ui/button';
import { Calendar } from '@/_components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/_components/ui/popover';

export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	return (
		<div className={cn('grid gap-4', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'default'}
						className={cn(
							' justify-start text-left  py-8 text-xs font-medium rounded-xl',
							!date && 'text-muted-foreground',
						)}>
						<CalendarIcon className='mr-2 h-5 w-5' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
