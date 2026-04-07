/** @format */

import { getGeneralPageData } from '@/actions/initial-pages/general';
import type { CompanyBigNumbersEntry } from '@/types/big-numbers-company';
import InvoicingXUnity from '../_components/kpis/InvoicingXUnity';
import InvoicingXUnityXTime from '../_components/kpis/InvoicingXUnityXTime';
import LocationsxUnity from '../_components/kpis/LocationsxUnity';
import OccupationXUnity from '../_components/kpis/OccupationXUnity';
import TKTxUnity from '../_components/kpis/TKTxUnity';
import TRevParXUnity from '../_components/kpis/TRevParXUnity';
import BigNumbersCompany from './_components/big-numbers-company';

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

type GeneralPageDataResult = Awaited<ReturnType<typeof getGeneralPageData>>;

type GeneralKpiSectionProps = {
	endDate: string | null;
	rangeDescription: string;
	startDate: string | null;
	period: string;
};

async function resolveGeneralData({
	period,
	startDate,
	endDate,
}: {
	period: string;
	startDate: string | null;
	endDate: string | null;
}): Promise<GeneralPageDataResult> {
	if (startDate && endDate) {
		const customData = await getGeneralPageData({
			startDate,
			endDate,
		});

		if (customData) {
			return customData;
		}

		return { ok: false, data: null, error: 'Algo deu errado' };
	}

	const data = await getGeneralPageData({ period });
	if (data) {
		return data;
	}

	return { ok: false, data: null, error: 'Algo deu errado' };
}

function GeneralKpiContent({
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

			<div className='flex gap-5 flex-col md:flex-row w-full h-full'>
				<div className='md:w-1/3 w-full h-full'>
					<InvoicingXUnity
						error={errorMessage}
						categories={revenueByCompany?.categories}
						series={revenueByCompany?.series}
					/>
				</div>
				<div className='md:w-2/3 h-full'>
					<LocationsxUnity data={rentalsByDate} />
				</div>
			</div>
			<div className='flex gap-5 flex-col'>
				<TKTxUnity data={ticketAverageByDate} />
				<TRevParXUnity data={trevparByDate} />
			</div>
			<div className='flex flex-col gap-5'>
				<InvoicingXUnityXTime data={revenueByDate} />
				<OccupationXUnity data={occupancyRateByDate} />
			</div>
		</div>
	);
}

export function GeneralKpiFallback({
	rangeDescription,
}: Pick<GeneralKpiSectionProps, 'rangeDescription'>) {
	return <GeneralKpiContent rangeDescription={rangeDescription} />;
}

export async function GeneralKpiSection({
	endDate,
	rangeDescription,
	startDate,
	period,
}: GeneralKpiSectionProps) {
	const resp = await resolveGeneralData({
		period,
		startDate,
		endDate,
	});

	return <GeneralKpiContent rangeDescription={rangeDescription} resp={resp} />;
}
