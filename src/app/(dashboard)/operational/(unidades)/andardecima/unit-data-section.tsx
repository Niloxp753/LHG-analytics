/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalAndarDeCimaDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			idealNumber={9}
			unitName='Andar de Cima'
		/>
	);
}
