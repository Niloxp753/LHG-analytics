/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalLushLapaDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			idealNumber={9}
			unitName='Lush Lapa'
		/>
	);
}
