/** @format */

import type { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';
import BigNumbersPage from './kpis/big-numbers-page';
import UnityxRevenue from './kpis/UnityxRevenue';
import UnityxRevenuexTimeAB from './kpis/UnityxRevenuexTimeAB';
import UnityxRevenuexTimeABPercent from './kpis/UnityxRevenuexTimeABPercent';
import UnityxSales from './kpis/UnityxSales';
import UnityxTKTxTime from './kpis/UnityxTKTxTime';
import DeferredChartMount from '../../_components/charts/deferred-chart-mount';
import type { RestaurantPageDataResult } from '../kpi-section';

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

export function RestaurantKpiContent({
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

			<div className='flex gap-5 flex-col mx-auto w-full h-full'>
				<UnityxRevenue data={revenueByCompany} error={errorMessage} />
				<UnityxSales data={salesByCompany} error={errorMessage} />
			</div>

			<div className='flex flex-col gap-5'>
				<DeferredChartMount
					minHeight={420}
					name='restaurant-consolidated-revenue-ab'>
					<UnityxRevenuexTimeAB
						data={revenueAbByPeriod}
						error={errorMessage}
					/>
				</DeferredChartMount>
				<DeferredChartMount
					minHeight={420}
					name='restaurant-consolidated-revenue-ab-percent'>
					<UnityxRevenuexTimeABPercent
						data={revenueAbByPeriodPercent}
						error={errorMessage}
					/>
				</DeferredChartMount>
				<DeferredChartMount
					minHeight={420}
					name='restaurant-consolidated-ticket-average'>
					<UnityxTKTxTime
						data={ticketAverageByPeriod}
						error={errorMessage}
					/>
				</DeferredChartMount>
			</div>
		</div>
	);
}
