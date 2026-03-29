/** @format */

import { getRestaurantPageData } from '@/actions/restaurants/get-restaurant-page';
import type { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';
import BigNumbersPage from './_components/kpis/big-numbers-page';
import UnityxRevenue from './_components/kpis/UnityxRevenue';
import UnityxRevenuexTimeAB from './_components/kpis/UnityxRevenuexTimeAB';
import UnityxRevenuexTimeABPercent from './_components/kpis/UnityxRevenuexTimeABPercent';
import UnityxSales from './_components/kpis/UnityxSales';
import UnityxTKTxTime from './_components/kpis/UnityxTKTxTime';

type NamedSeriesData = {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
};

type RestaurantUnifiedData = {
	BigNumbers: RestaurantBigNumbersEntry[];
	RevenueAbByPeriod: NamedSeriesData;
	TicketAverageByPeriod: NamedSeriesData;
	RevenueAbByPeriodPercent: NamedSeriesData;
	RevenueByCompany: NamedSeriesData;
	SalesByCompany: NamedSeriesData;
};

type RestaurantPageDataResult = Awaited<
	ReturnType<typeof getRestaurantPageData>
>;

type RestaurantKpiSectionProps = {
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

function RestaurantKpiContent({
	description,
	resp,
}: {
	description: string;
	resp?: RestaurantPageDataResult;
}) {
	const isLoading = typeof resp === 'undefined';
	const hasError = !isLoading && (!resp.ok || !resp.data);
	const errorMessage =
		!isLoading && hasError
			? resp.error
				? resp.error
				: 'Não foi possível carregar os dados.'
			: undefined;

	const unifiedData =
		!isLoading && !hasError && !Array.isArray(resp.data)
			? (resp.data as RestaurantUnifiedData)
			: null;
	const bigNumbers = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BigNumbers ?? null);
	const revenueAbByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueAbByPeriod ?? null);
	const ticketAverageByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.TicketAverageByPeriod ?? null);
	const revenueAbByPeriodPercent = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueAbByPeriodPercent ?? null);
	const revenueByCompany = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueByCompany ?? null);
	const salesByCompany = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.SalesByCompany ?? null);

	return (
		<div
			data-testid={isLoading ? 'restaurant-kpis-loading' : undefined}
			className='w-full flex flex-col h-full gap-5 px-3 md:px-0'>
			<BigNumbersPage description={description} data={bigNumbers} />

			<div className='flex gap-5 flex-col md:flex-row mx-auto w-full h-full'>
				<UnityxRevenue data={revenueByCompany} error={errorMessage} />
				<UnityxSales data={salesByCompany} error={errorMessage} />
			</div>

			<div className='flex flex-col gap-5'>
				<UnityxRevenuexTimeAB
					data={revenueAbByPeriod}
					error={errorMessage}
				/>
				<UnityxRevenuexTimeABPercent
					data={revenueAbByPeriodPercent}
					error={errorMessage}
				/>
				<UnityxTKTxTime
					data={ticketAverageByPeriod}
					error={errorMessage}
				/>
			</div>
		</div>
	);
}

export function RestaurantKpiFallback({
	description,
}: Pick<RestaurantKpiSectionProps, 'description'>) {
	return <RestaurantKpiContent description={description} />;
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
