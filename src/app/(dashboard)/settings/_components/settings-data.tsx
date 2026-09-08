/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import { userActionFailureCopy } from '@/actions/user-action-result';
import ErrorState from '@/app/(dashboard)/_components/ErrorState';
import { DataTableDemo } from './dataTable';

export async function SettingsData() {
	const result = await getAllUsersAction();
	if (!result.ok) {
		const copy = userActionFailureCopy(result.code);
		return <ErrorState title={copy.title} description={copy.description} />;
	}

	return <DataTableDemo data={result.data} />;
}
