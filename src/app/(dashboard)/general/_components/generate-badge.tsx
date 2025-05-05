/** @format */

import { Badge } from '@/components/ui/badge';
import { NormalizeTimeToSec } from '@/utils/normalize-bignumbers-general';
import { Triangle } from 'lucide-react';
import React from 'react';

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
					<Triangle
						size={14}
						className='mr-1.5'
					/>
					{resp.toFixed(2) + '%'}
				</Badge>
			);
		} else {
			return (
				<Badge variant={'destructive'}>
					<Triangle
						size={14}
						className='rotate-180 mr-1.5'
					/>
					{resp.toFixed(2) + '%'}
				</Badge>
			);
		}
	}

	const resp =
		((Number(val) - Number(previousVal)) / Number(previousVal)) * 100;

	if (val == 0 || previousVal == 0) {
		return null;
	}

	if (resp > 0) {
		return (
			<Badge variant={'success'}>
				<Triangle
					size={14}
					className='mr-1.5'
				/>
				{resp.toFixed(2) + '%'}
			</Badge>
		);
	} else {
		return (
			<Badge variant={'destructive'}>
				<Triangle
					size={14}
					className='rotate-180 mr-1.5'
				/>
				{resp.toFixed(2) + '%'}
			</Badge>
		);
	}
}
