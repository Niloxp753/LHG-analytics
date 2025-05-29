/** @format */

import { Badge } from '@/components/ui/badge';
import { NormalizeTimeToSec } from '@/utils/normalize-bignumbers-general';
import { TrendingDown, TrendingUp } from 'lucide-react';

export default function GenerateBadge({
	val,
	previousVal,
	tmo,
}: {
	val: number | string;
	previousVal: number | string;
	tmo?: boolean;
}) {
	if (tmo) {
		const { totalSegundosA, totalSegundosB } = NormalizeTimeToSec({
			valueA: String(val),
			valueB: String(previousVal),
		});

		const resp =
			((Number(totalSegundosA) - Number(totalSegundosB)) /
				Number(totalSegundosB)) *
			100;

		if (resp > 0) {
			return (
				<Badge variant={'success'}>
					<TrendingUp
						size={14}
						className='mr-1.5'
					/>
					{resp.toFixed(2) + '%'}
				</Badge>
			);
		} else {
			return (
				<Badge variant={'destructive'}>
					<TrendingDown
						size={14}
						className=' mr-1.5'
					/>
					{resp.toFixed(2) + '%'}
				</Badge>
			);
		}
	}

	const resp =
		((Number(val) - Number(previousVal)) / Number(previousVal)) * 100;

	// if (val == 0 || previousVal == 0) {
	// 	return null;
	// }

	if (resp > 0) {
		return (
			<Badge variant={'success'}>
				<TrendingUp
					size={14}
					className='mr-1.5'
				/>
				{resp.toFixed(2) + '%'}
			</Badge>
		);
	} else {
		return (
			<Badge variant={'destructive'}>
				<TrendingDown
					size={14}
					className=' mr-1.5'
				/>
				{resp.toFixed(0) + '%'}
			</Badge>
		);
	}
}
