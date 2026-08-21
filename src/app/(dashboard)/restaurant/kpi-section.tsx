/** @format */

import { getRestaurantPageData } from '@/actions/restaurants/get-restaurant-page';
import { RestaurantKpiContent } from './_components/restaurant-kpi-content';

export type RestaurantPageDataResult = Awaited<
	ReturnType<typeof getRestaurantPageData>
>;

export type RestaurantKpiSectionProps = {
	description: string;
	endDate: string | null;
	startDate: string | null;
	period: string;
};

async function resolveRestaurantData({
	period,
	startDate,
	endDate,
}: {
	period: string;
	startDate: string | null;
	endDate: string | null;
}): Promise<RestaurantPageDataResult> {
	if (startDate && endDate) {
		const customData = await getRestaurantPageData({
			startDate,
			endDate,
		});

		if (customData) {
			return customData;
		}

		return { ok: false, data: null, error: 'Algo deu errado' };
	}

	const data = await getRestaurantPageData({ period });
	if (data) {
		return data;
	}

	return { ok: false, data: null, error: 'Algo deu errado' };
}

export async function RestaurantKpiSection({
	description,
	endDate,
	startDate,
	period,
}: RestaurantKpiSectionProps) {
	const resp = await resolveRestaurantData({
		period,
		startDate,
		endDate,
	});

	return <RestaurantKpiContent description={description} resp={resp} />;
}
