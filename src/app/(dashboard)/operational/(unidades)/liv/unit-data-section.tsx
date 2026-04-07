/** @format */

import { getLivOperationalPageData } from '@/actions/liv/get-liv-operational-page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AfternoonCleaningWorkers from '../../_components/kpis-unidade/afternoon-cleaning-worker';
import BigNumbersOperation from '../../_components/kpis-unidade/big-numbers-operation';
import MorningCleaningWorkers from '../../_components/kpis-unidade/morning-cleaning-worker';
import NightCleaningWorkers from '../../_components/kpis-unidade/night-cleaning-worker';
import Performance from '../../_components/kpis-unidade/performance';
import SuitesOutsourcedInternal from '../../_components/kpis-unidade/suites-outsourced-internal';
import TableWokersAfternoon from '../../_components/kpis-unidade/table-workers-afternoon';
import TableWokersMorning from '../../_components/kpis-unidade/table-workers-morning';
import TableWokersNight from '../../_components/kpis-unidade/table-workers-nigh';
import TableWokersWeekly from '../../_components/kpis-unidade/table-workers-weekly';
import TotalCleaning from '../../_components/kpis-unidade/total-cleaning';

type OperationalLivDataSectionProps = {
	description: string;
	endDate: string | null;
	preSet: string;
	startDate: string | null;
};

export default async function OperationalLivDataSection({
	description,
	endDate,
	preSet,
	startDate,
}: OperationalLivDataSectionProps) {
	const result = await getLivOperationalPageData({
		period: preSet,
		startDate,
		endDate,
	});
	const resp = result.ok ? result.data : null;

	if (!resp) {
		return (
			<Alert variant='destructive' className='w-full'>
				<AlertTitle>Erro ao carregar</AlertTitle>
				<AlertDescription>
					Não foi possível carregar os dados operacionais.
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
			<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
				<Performance data={resp.SupervisorsPerformance} />
				<SuitesOutsourcedInternal data={resp.ShiftCleaning} />
			</div>
			<div className='w-full h-full flex gap-5 justify-between flex-col'>
				<TotalCleaning data={resp.CleaningByDate} />
			</div>
			<div className='flex gap-5 flex-col items-center'>
				<MorningCleaningWorkers
					categories={resp.EmployeeCleaningByShift.categories}
					series={employeeCleaningByShiftSeries[morningShiftKey] ?? null}
				/>
				<AfternoonCleaningWorkers
					categories={resp.EmployeeCleaningByShift.categories}
					series={employeeCleaningByShiftSeries.Tarde ?? null}
				/>
				<NightCleaningWorkers
					categories={resp.EmployeeCleaningByShift.categories}
					series={employeeCleaningByShiftSeries.Noite ?? null}
				/>
			</div>
			<div className='flex gap-5 flex-col w-full'>
				<TableWokersMorning
					dataTable={employeeReport[morningReportKey] ?? null}
				/>
				<TableWokersAfternoon dataTable={employeeReport.Tarde ?? null} />
				<TableWokersNight dataTable={employeeReport.Noite ?? null} />
				{hasTeamSizing ? (
					<TableWokersWeekly dataTable={resp.TeamSizing} idealNumber={18} />
				) : (
					<Alert variant='destructive' className='w-full'>
						<AlertTitle>Erro ao carregar</AlertTitle>
						<AlertDescription>
							Não foi possível carregar o dimensionamento de equipe.
						</AlertDescription>
					</Alert>
				)}
			</div>
		</>
	);
}
