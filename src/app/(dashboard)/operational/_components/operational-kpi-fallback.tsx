/** @format */

import { OperationalKpiContent } from './operational-kpi-content';
import type { OperationalKpiSectionProps } from '../kpi-section';

export default function OperationalKpiFallback({
	description,
}: Pick<OperationalKpiSectionProps, 'description'>) {
	return <OperationalKpiContent description={description} />;
}
