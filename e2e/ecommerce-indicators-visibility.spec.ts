import { expect, test } from '@playwright/test';
import { hasEcommerceIndicatorsData } from '../src/app/(dashboard)/reservations/_components/ecommerce-visibility';

const zeroBigNumbers = [
	{
		currentDate: {
			totalAllValue: 0,
			totalAllBookings: 0,
			totalAllTicketAverage: 0,
			totalAllRepresentativeness: 0,
		},
	},
];

test('hides the e-commerce block when every current value is zero', () => {
	expect(
		hasEcommerceIndicatorsData({
			bigNumbers: zeroBigNumbers,
			reservationsSeries: [0, 0, 0],
			billingSeries: [0, 0, 0],
		}),
	).toBe(false);
});

test('hides the e-commerce block when its payload is absent', () => {
	expect(hasEcommerceIndicatorsData({})).toBe(false);
});

test('renders the e-commerce block when any source contains a non-zero value', () => {
	expect(
		hasEcommerceIndicatorsData({
			bigNumbers: zeroBigNumbers,
			reservationsSeries: [0, 1, 0],
			billingSeries: [0, 0, 0],
		}),
	).toBe(true);
});
