/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalToutDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			idealNumber={11}
			unitName='Tout'
		/>
	);
}
