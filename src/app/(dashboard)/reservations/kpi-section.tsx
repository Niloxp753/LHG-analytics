/** @format */

import { getReservationPageData } from '@/actions/reservations/get-reservations-page';
import type { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';
import BigNumbersEcommerce from './_components/big-numbers-ecommerce';
import BigNumbersReservationPage from './_components/big-numbers-reservation-page';
import BookingsByCompany from './_components/page-kpis/bookings-by-company';
import DataByCompanyReservationsInTime from './_components/page-kpis/revenue-by-company-in-time';
import RevenueByCompany from './_components/page-kpis/revenue-by-company';

type NamedSeriesData = {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
};

type ReservationsUnifiedData = {
	BigNumbers: ReservationsBigNumbersEntry[];
	BigNumbersEcommerce: ReservationsBigNumbersEntry[];
	BillingOfReservationsByPeriod: NamedSeriesData;
	NumberOfReservationsPerPeriod: NamedSeriesData;
	RepresentativenessOfReservesByPeriod: NamedSeriesData;
	BillingOfEcommerceByPeriod: NamedSeriesData;
	ReservationsOfEcommerceByPeriod: NamedSeriesData;
	RevenueByCompany: NamedSeriesData;
	BookingsByCompany: NamedSeriesData;
};

type ReservationsPageDataResult = Awaited<
	ReturnType<typeof getReservationPageData>
>;

type ReservationsKpiSectionProps = {
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

function ReservationsKpiContent({
	description,
	resp,
}: {
	description: string;
	resp?: ReservationsPageDataResult;
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
			? (resp.data as ReservationsUnifiedData)
			: null;
	const bigNumbers = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BigNumbers ?? null);
	const billingOfReservationsByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BillingOfReservationsByPeriod ?? null);
	const numberOfReservationsPerPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.NumberOfReservationsPerPeriod ?? null);
	const representativenessOfReservesByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RepresentativenessOfReservesByPeriod ?? null);
	const billingOfEcommerceByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BillingOfEcommerceByPeriod ?? null);
	const reservationsOfEcommerceByPeriod = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.ReservationsOfEcommerceByPeriod ?? null);
	const revenueByCompany = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.RevenueByCompany ?? null);
	const bookingsByCompany = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BookingsByCompany ?? null);
	const bigNumbersEcommerce = isLoading
		? undefined
		: hasError
			? null
			: (unifiedData?.BigNumbersEcommerce ?? null);

	return (
		<div
			data-testid={isLoading ? 'reservations-kpis-loading' : undefined}
			className='w-full flex gap-5 flex-col justify-start px-3 md:px-0'>
			<div>
				<BigNumbersReservationPage
					data={bigNumbers}
					description={description}
					ecommerce={false}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-5'>
				<RevenueByCompany
					data={revenueByCompany}
					title={'Faturamento por unidade'}
					money
					error={errorMessage}
				/>
				<BookingsByCompany
					data={bookingsByCompany}
					title={'Número de Reservas por unidade'}
					error={errorMessage}
				/>
			</div>
			<div className='flex flex-col gap-5'>
				<DataByCompanyReservationsInTime
					data={billingOfReservationsByPeriod}
					title={'Faturamento por unidade no tempo'}
					money
					error={errorMessage}
				/>
				<DataByCompanyReservationsInTime
					data={numberOfReservationsPerPeriod}
					title={'Número de reservas por unidade'}
					money={false}
					error={errorMessage}
				/>
				<DataByCompanyReservationsInTime
					data={representativenessOfReservesByPeriod}
					title={'Rep. por unidade'}
					percent
					error={errorMessage}
				/>
			</div>

			<div className='flex flex-col gap-5'>
				<h2 className='text-4xl font-bold text-zinc-50 mt-10'>
					Indicadores de E-Commerce
				</h2>
				<BigNumbersEcommerce
					data={bigNumbersEcommerce}
					description={description}
				/>

				<div className='w-full flex flex-col items-center justify-between gap-5'>
					<DataByCompanyReservationsInTime
						data={billingOfEcommerceByPeriod}
						title={'Faturamento por unidade - Ecommerce'}
						money
						error={errorMessage}
					/>
					<DataByCompanyReservationsInTime
						data={reservationsOfEcommerceByPeriod}
						title={'Rep. por unidade - Ecommerce'}
						percent
						error={errorMessage}
					/>
				</div>
			</div>
		</div>
	);
}

export function ReservationsKpiFallback({
	description,
}: Pick<ReservationsKpiSectionProps, 'description'>) {
	return <ReservationsKpiContent description={description} />;
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
