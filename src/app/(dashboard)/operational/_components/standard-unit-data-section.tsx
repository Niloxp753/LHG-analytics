/** @format */

import { getGovernanceAction } from '@/actions/getGovernance';
import { getOperationCustomAction } from '@/actions/getoperationsCustom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
	company?: string;
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

	return (
		<>
			<BigNumbersOperation
				data={resp.BigNumbers}
				description={description}
			/>
			<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
				<Performance data={resp.SupervisorsPerformance} />
				<SuitesOutsourcedInternal data={resp.ShiftCleaning} />
			</div>
			<div className='w-full h-full flex gap-5 justify-between flex-col'>
				<TotalCleaning data={resp.CleaningByDate} />
			</div>
			<div className='flex gap-5 flex-col items-center'>
				<MorningCleaningWorkers
					categories={resp.EmployeeCleaningByShift?.categories}
					series={resp.EmployeeCleaningByShift?.series['Manhã'] ?? null}
				/>
				<AfternoonCleaningWorkers
					categories={resp.EmployeeCleaningByShift?.categories}
					series={resp.EmployeeCleaningByShift?.series.Tarde ?? null}
				/>
				<NightCleaningWorkers
					categories={resp.EmployeeCleaningByShift?.categories}
					series={resp.EmployeeCleaningByShift?.series.Noite ?? null}
				/>
			</div>
			<div className='flex gap-5 flex-col w-full'>
				<TableWokersMorning dataTable={resp.EmployeeReport?.Manhã ?? null} />
				<TableWokersAfternoon dataTable={resp.EmployeeReport?.Tarde ?? null} />
				<TableWokersNight dataTable={resp.EmployeeReport?.Noite ?? null} />
				<TableWokersWeekly
					dataTable={resp.TeamSizing}
					idealNumber={idealNumber}
				/>
			</div>
		</>
	);
}
