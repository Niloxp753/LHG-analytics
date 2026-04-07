/** @format */

import {
	StandardOperationalUnitDataSection,
	type StandardOperationalUnitDataSectionProps,
} from '../../_components/standard-unit-data-section';

export default async function OperationalLushIpirangaDataSection(
	props: Omit<
		StandardOperationalUnitDataSectionProps,
		'idealNumber' | 'unitName'
	>,
) {
	return (
		<StandardOperationalUnitDataSection
			{...props}
			idealNumber={7}
			unitName='Lush Ipiranga'
		/>
	);
}
