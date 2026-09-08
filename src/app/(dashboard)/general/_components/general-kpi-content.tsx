/** @format */

import type { CompanyBigNumbersEntry } from '@/types/big-numbers-company';
import InvoicingXUnity from '../../_components/kpis/InvoicingXUnity';
import InvoicingXUnityXTime from '../../_components/kpis/InvoicingXUnityXTime';
import LocationsxUnity from '../../_components/kpis/LocationsxUnity';
import OccupationXUnity from '../../_components/kpis/OccupationXUnity';
import TKTxUnity from '../../_components/kpis/TKTxUnity';
import TRevParXUnity from '../../_components/kpis/TRevParXUnity';
import DeferredChartMount from '../../_components/charts/deferred-chart-mount';
import BigNumbersCompany from './big-numbers-company';
import type { GeneralPageDataResult } from '../kpi-section';

type NamedSeriesData = {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
};

type SimpleSeriesData = {
	categories: string[];
	series: number[];
};

type GeneralUnifiedData = {
	BigNumbers: CompanyBigNumbersEntry[];
	RevenueByCompany: SimpleSeriesData;
	RentalsByDate: NamedSeriesData;
	TicketAverageByDate: NamedSeriesData;
	TrevparByDate: NamedSeriesData;
	RevenueByDate: NamedSeriesData;
	OccupancyRateByDate: NamedSeriesData;
};

export function GeneralKpiContent({
	rangeDescription,
	resp,
}: {
	rangeDescription: string;
	resp?: GeneralPageDataResult;
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
			? (resp.data as GeneralUnifiedData)
			: null;
	const bigNumbers = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BigNumbers ?? null);
	const revenueByCompany = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueByCompany ?? null);
	const rentalsByDate = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RentalsByDate ?? null);
	const ticketAverageByDate = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.TicketAverageByDate ?? null);
	const trevparByDate = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.TrevparByDate ?? null);
	const revenueByDate = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueByDate ?? null);
	const occupancyRateByDate = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.OccupancyRateByDate ?? null);

	return (
		<div
			data-testid={isLoading ? 'general-kpis-loading' : undefined}
			className='w-full h-full flex gap-5 flex-col md:px-0'>
			<BigNumbersCompany
				data={bigNumbers}
				description={rangeDescription}
			/>

			<DeferredChartMount
				eager
				minHeight={420}
				name='general-consolidated-summary'>
				<InvoicingXUnity
					error={errorMessage}
					categories={revenueByCompany?.categories}
					series={revenueByCompany?.series}
				/>
			</DeferredChartMount>
			<DeferredChartMount
				minHeight={420}
				name='general-consolidated-rentals'>
				<LocationsxUnity data={rentalsByDate} />
			</DeferredChartMount>
			<DeferredChartMount
				minHeight={700}
				name='general-consolidated-ticket-trevpar'>
				<div className='flex gap-5 flex-col'>
					<TKTxUnity data={ticketAverageByDate} />
					<TRevParXUnity data={trevparByDate} />
				</div>
			</DeferredChartMount>
			<div className='flex flex-col gap-5'>
				<DeferredChartMount
					minHeight={420}
					name='general-consolidated-revenue-by-date'>
					<InvoicingXUnityXTime data={revenueByDate} />
				</DeferredChartMount>
				<DeferredChartMount
					minHeight={420}
					name='general-consolidated-occupancy'>
					<OccupationXUnity data={occupancyRateByDate} />
				</DeferredChartMount>
			</div>
		</div>
	);
}
