/** @format */

import { getGovernanceAction } from '@/actions/getGovernance';
import { getOperationCustomAction } from '@/actions/getoperationsCustom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import BigNumbersOperation from '../../_components/kpis-unidade/big-numbers-operation';
import MorningCleaningWorkers from '../../_components/kpis-unidade/morning-cleaning-worker';
import { orderOperationalShiftKeys } from '../../_components/kpis-unidade/operational-shifts';
import Performance from '../../_components/kpis-unidade/performance';
import SuitesOutsourcedInternal from '../../_components/kpis-unidade/suites-outsourced-internal';
import TableWokersMorning from '../../_components/kpis-unidade/table-workers-morning';
import TableWokersWeekly from '../../_components/kpis-unidade/table-workers-weekly';
import TotalCleaning from '../../_components/kpis-unidade/total-cleaning';

type OperationalAltanaDataSectionProps = {
	description: string;
	endDate: string | null;
	preSet: string;
	startDate: string | null;
};

async function getOperationalAltanaData({
	endDate,
	preSet,
	startDate,
}: Omit<OperationalAltanaDataSectionProps, 'description'>) {
	if (startDate && endDate) {
		return getOperationCustomAction(startDate, endDate, 'altana');
	}

	return getGovernanceAction(preSet, 'altana');
}

export function OperationalAltanaDataFallback({
	description,
}: Pick<OperationalAltanaDataSectionProps, 'description'>) {
	return (
		<div
			data-testid='operational-altana-unit-loading'
			className='w-full h-full flex gap-5 flex-col'>
			<BigNumbersOperation description={description} />
			<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
				<Skeleton className='h-[340px] w-full rounded-xl' />
				<Skeleton className='h-[340px] w-full rounded-xl' />
			</div>
			<Skeleton className='h-[360px] w-full rounded-xl' />
			<div className='flex gap-5 flex-col items-center w-full'>
				<Skeleton className='h-[480px] w-full rounded-xl' />
				<Skeleton className='h-[480px] w-full rounded-xl' />
				<Skeleton className='h-[480px] w-full rounded-xl' />
			</div>
			<div className='flex gap-5 flex-col w-full'>
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[380px] w-full rounded-xl' />
			</div>
		</div>
	);
}

export async function OperationalAltanaDataSection({
	description,
	endDate,
	preSet,
	startDate,
}: OperationalAltanaDataSectionProps) {
	const resp = await getOperationalAltanaData({ endDate, preSet, startDate });

	if (!resp) {
		return (
			<Alert variant='destructive' className='w-full'>
				<AlertTitle>Erro ao carregar</AlertTitle>
				<AlertDescription>
					N\u00e3o foi poss\u00edvel carregar os dados operacionais da Altana.
				</AlertDescription>
			</Alert>
		);
	}

	const employeeShiftSeries = resp.EmployeeCleaningByShift?.series ?? {};
	const employeeReport = resp.EmployeeReport ?? {};
	const shiftKeys = orderOperationalShiftKeys([
		...Object.keys(employeeShiftSeries),
		...Object.keys(employeeReport),
	]);

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
				{shiftKeys.map((shiftKey) => (
					<MorningCleaningWorkers
						key={shiftKey}
						categories={resp.EmployeeCleaningByShift.categories}
						series={employeeShiftSeries[shiftKey] ?? null}
						title={`Total de Limpezas - ${shiftKey}`}
					/>
				))}
			</div>
			<div className='flex gap-5 flex-col w-full'>
				{shiftKeys.map((shiftKey) => (
					<TableWokersMorning
						key={shiftKey}
						dataTable={employeeReport[shiftKey] ?? null}
						headingLabel={shiftKey}
						tableTitle={`Colaboradores - ${shiftKey}`}
						totalColumnLabel='Total de Limpezas'
					/>
				))}
				<TableWokersWeekly dataTable={resp.TeamSizing} idealNumber={11} />
			</div>
		</>
	);
}
