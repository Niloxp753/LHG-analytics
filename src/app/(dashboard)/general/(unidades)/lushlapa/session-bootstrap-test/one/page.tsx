import DashboardPageSessionBoundary from '@/app/(dashboard)/_components/dashboard-page-session-boundary';
import { notFound } from 'next/navigation';
import SessionBootstrapProfileContent from '../session-bootstrap-profile-content';

export default function SessionBootstrapProfileOnePage() {
	if (process.env.PLAYWRIGHT_MOCKS !== 'true') {
		notFound();
	}

	return (
		<DashboardPageSessionBoundary>
			<SessionBootstrapProfileContent step='one' />
		</DashboardPageSessionBoundary>
	);
}
