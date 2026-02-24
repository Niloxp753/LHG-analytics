/** @format */

import { Badge } from '@/components/ui/badge';
import { NormalizeTimeToSec } from '@/utils/normalize-bignumbers-general';
import { TrendingDown, TrendingUp } from 'lucide-react';

function getSafePercentChange(
	currentValue: number | string,
	previousValue: number | string,
) {
	const current = Number(currentValue);
	const previous = Number(previousValue);

	if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
		return 0;
	}

	const result = ((current - previous) / previous) * 100;

	return Number.isFinite(result) ? result : 0;
}

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

		const resp = getSafePercentChange(totalSegundosA, totalSegundosB);

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

	const resp = getSafePercentChange(val, previousVal);

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
