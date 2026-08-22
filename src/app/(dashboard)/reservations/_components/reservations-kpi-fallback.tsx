/** @format */

import { ReservationsKpiContent } from './reservations-kpi-content';
import type { ReservationsKpiSectionProps } from '../kpi-section';

export default function ReservationsKpiFallback({
	description,
}: Pick<ReservationsKpiSectionProps, 'description'>) {
	return <ReservationsKpiContent description={description} />;
}
