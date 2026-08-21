/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalGetanGaraveloDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'company' | 'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			company='getan_garavelo'
			idealNumber={7}
			unitName='Getan Garavelo'
		/>
	);
}
