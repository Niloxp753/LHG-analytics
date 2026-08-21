/** @format */

import { RestaurantKpiContent } from './restaurant-kpi-content';
import type { RestaurantKpiSectionProps } from '../kpi-section';

export default function RestaurantKpiFallback({
	description,
}: Pick<RestaurantKpiSectionProps, 'description'>) {
	return <RestaurantKpiContent description={description} />;
}
