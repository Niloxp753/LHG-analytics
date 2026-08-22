import type { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';

type EcommerceIndicatorsData = {
	bigNumbers?: ReservationsBigNumbersEntry[] | null;
	reservationsSeries?: number[] | null;
	billingSeries?: number[] | null;
};

export function hasEcommerceIndicatorsData({
	bigNumbers,
	reservationsSeries,
	billingSeries,
}: EcommerceIndicatorsData) {
	const currentBigNumberValues =
		bigNumbers?.flatMap(({ currentDate }) => Object.values(currentDate)) ?? [];
	const values = [
		...currentBigNumberValues,
		...(reservationsSeries ?? []),
		...(billingSeries ?? []),
	];

	return values.some(
		(value) =>
			typeof value === 'number' && Number.isFinite(value) && value !== 0,
	);
}
