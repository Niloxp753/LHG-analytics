/** @format */

import { getGovernanceAction } from '@/actions/getGovernance';
import { getOperationCustomAction } from '@/actions/getoperationsCustom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { DashboardCompanyKey } from '@/lib/dashboard-company';
import DeferredChartMount from '../../_components/charts/deferred-chart-mount';
import AfternoonCleaningWorkers from './kpis-unidade/afternoon-cleaning-worker';
import BigNumbersOperation from './kpis-unidade/big-numbers-operation';
import MorningCleaningWorkers from './kpis-unidade/morning-cleaning-worker';
import NightCleaningWorkers from './kpis-unidade/night-cleaning-worker';
import Performance from './kpis-unidade/performance';
import SuitesOutsourcedInternal from './kpis-unidade/suites-outsourced-internal';
import TableWokersAfternoon from './kpis-unidade/table-workers-afternoon';
import TableWokersMorning from './kpis-unidade/table-workers-morning';
import TableWokersNight from './kpis-unidade/table-workers-nigh';
import TableWokersWeekly from './kpis-unidade/table-workers-weekly';
import TotalCleaning from './kpis-unidade/total-cleaning';

export type StandardOperationalUnitDataSectionProps = {
	company?: DashboardCompanyKey;
	description: string;
	endDate: string | null;
	idealNumber: number;
	preSet: string;
	startDate: string | null;
	unitName: string;
};

async function getStandardOperationalUnitData({
	company,
	endDate,
	preSet,
	startDate,
}: Pick<
	StandardOperationalUnitDataSectionProps,
	'company' | 'endDate' | 'preSet' | 'startDate'
>) {
	if (startDate && endDate) {
		return getOperationCustomAction(startDate, endDate, company);
	}

	return getGovernanceAction(preSet, company);
}

export async function StandardOperationalUnitDataSection({
	company,
	description,
	endDate,
	idealNumber,
	preSet,
	startDate,
	unitName,
}: StandardOperationalUnitDataSectionProps) {
	const resp = await getStandardOperationalUnitData({
		company,
		endDate,
		preSet,
		startDate,
	});

	if (!resp) {
		return (
			<Alert variant='destructive' className='w-full'>
				<AlertTitle>Erro ao carregar</AlertTitle>
				<AlertDescription>
					{`Não foi possível carregar os dados operacionais de ${unitName}.`}
				</AlertDescription>
			</Alert>
		);
	}

	const employeeCleaningByShiftSeries =
		resp.EmployeeCleaningByShift?.series ?? {};
	const morningShiftKey =
		Object.keys(employeeCleaningByShiftSeries).find((key) =>
			key.toLowerCase().startsWith('manh'),
		) ?? 'Manhã';
	const employeeReport = resp.EmployeeReport ?? {};
	const morningReportKey =
		Object.keys(employeeReport).find((key) =>
			key.toLowerCase().startsWith('manh'),
		) ?? 'Manhã';
	const hasTeamSizing =
		!!resp.TeamSizing &&
		typeof resp.TeamSizing === 'object' &&
		'Totals' in resp.TeamSizing;

	return (
		<>
			<BigNumbersOperation
				data={resp.BigNumbers}
				description={description}
			/>
			<DeferredChartMount
				eager
				minHeight={420}
				name='operational-unit-summary'>
				<div className='flex items-center gap-5 justify-between flex-col'>
					<Performance data={resp.SupervisorsPerformance} />
					<SuitesOutsourcedInternal data={resp.ShiftCleaning} />
				</div>
			</DeferredChartMount>
			<DeferredChartMount
				minHeight={420}
				name='operational-unit-total-cleaning'>
				<div className='w-full h-full flex gap-5 justify-between flex-col'>
					<TotalCleaning data={resp.CleaningByDate} />
				</div>
			</DeferredChartMount>
			<div className='flex gap-5 flex-col items-center'>
				<DeferredChartMount
					minHeight={520}
					name='operational-unit-morning-workers'>
					<MorningCleaningWorkers
						categories={resp.EmployeeCleaningByShift?.categories}
						series={employeeCleaningByShiftSeries[morningShiftKey] ?? null}
					/>
				</DeferredChartMount>
				<DeferredChartMount
					minHeight={360}
					name='operational-unit-afternoon-workers'>
					<AfternoonCleaningWorkers
						categories={resp.EmployeeCleaningByShift?.categories}
						series={resp.EmployeeCleaningByShift?.series.Tarde ?? null}
					/>
				</DeferredChartMount>
				<DeferredChartMount
					minHeight={360}
					name='operational-unit-night-workers'>
					<NightCleaningWorkers
						categories={resp.EmployeeCleaningByShift?.categories}
						series={resp.EmployeeCleaningByShift?.series.Noite ?? null}
					/>
				</DeferredChartMount>
			</div>
			<div className='flex gap-5 flex-col w-full'>
				<TableWokersMorning
					dataTable={employeeReport[morningReportKey] ?? null}
				/>
				<TableWokersAfternoon dataTable={employeeReport.Tarde ?? null} />
				<TableWokersNight dataTable={employeeReport.Noite ?? null} />
				{hasTeamSizing ? (
					<TableWokersWeekly
						dataTable={resp.TeamSizing}
						idealNumber={idealNumber}
					/>
				) : (
					<Alert variant='destructive' className='w-full'>
						<AlertTitle>Erro ao carregar</AlertTitle>
						<AlertDescription>
							{`Não foi possível carregar o dimensionamento de equipe de ${unitName}.`}
						</AlertDescription>
					</Alert>
				)}
			</div>
		</>
	);
}
