/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalGetanParqueOesteDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'company' | 'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			company='getan_pq_oeste'
			idealNumber={7}
			unitName='Getan Parque Oeste'
		/>
	);
}
