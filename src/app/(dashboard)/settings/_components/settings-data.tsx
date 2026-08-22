/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import { DataTableDemo } from './dataTable';

export async function SettingsData() {
	const users = await getAllUsersAction();

	return users && <DataTableDemo data={users} />;
}
