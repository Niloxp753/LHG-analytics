/** @format */

import { GeneralKpiContent } from './general-kpi-content';
import type { GeneralKpiSectionProps } from '../kpi-section';

export default function GeneralKpiFallback({
	rangeDescription,
}: Pick<GeneralKpiSectionProps, 'rangeDescription'>) {
	return <GeneralKpiContent rangeDescription={rangeDescription} />;
}
