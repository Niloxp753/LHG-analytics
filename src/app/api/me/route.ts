import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
	if (process.env.PLAYWRIGHT_MOCKS !== 'true') {
		return new NextResponse(null, { status: 404 });
	}

	return NextResponse.json({
		email: 'playwright@local.test',
		name: 'Playwright',
		role: 'ADMIN',
		unit: 'LHG',
		cpf: '359.267.460-94',
	});
}
