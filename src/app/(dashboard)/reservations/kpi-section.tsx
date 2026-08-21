/** @format */

import { getReservationPageData } from '@/actions/reservations/get-reservations-page';
import { ReservationsKpiContent } from './_components/reservations-kpi-content';

export type ReservationsPageDataResult = Awaited<
	ReturnType<typeof getReservationPageData>
>;

export type ReservationsKpiSectionProps = {
	description: string;
	endDate: string | null;
	startDate: string | null;
	period: string;
};

async function resolveReservationsData({
	period,
	startDate,
	endDate,
}: {
	period: string;
	startDate: string | null;
	endDate: string | null;
}): Promise<ReservationsPageDataResult> {
	if (startDate && endDate) {
		const customData = await getReservationPageData({
			startDate,
			endDate,
		});

		if (customData) {
			return customData;
		}

		return { ok: false, data: null, error: 'Algo deu errado' };
	}

	const data = await getReservationPageData({ period });
	if (data) {
		return data;
	}

	return { ok: false, data: null, error: 'Algo deu errado' };
}

export async function ReservationsKpiSection({
	description,
	endDate,
	startDate,
	period,
}: ReservationsKpiSectionProps) {
	const resp = await resolveReservationsData({
		period,
		startDate,
		endDate,
	});

	return (
		<ReservationsKpiContent description={description} resp={resp} />
	);
}
