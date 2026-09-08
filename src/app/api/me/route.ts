import { NextResponse } from 'next/server';

type MockAuthGlobal = typeof globalThis & {
	__lhg_mock_auth_counts__?: {
		me: number;
	};
};

function mocksEnabled() {
	return process.env.PLAYWRIGHT_MOCKS === 'true';
}

function getMockAuthCounts() {
	const scope = globalThis as MockAuthGlobal;
	scope.__lhg_mock_auth_counts__ ??= { me: 0 };
	return scope.__lhg_mock_auth_counts__;
}

export async function GET(request: Request) {
	if (!mocksEnabled()) {
		return new NextResponse(null, { status: 404 });
	}

	const action = new URL(request.url).searchParams.get('__test');
	if (action === 'read-auth-counts') {
		return NextResponse.json(getMockAuthCounts());
	}

	const counts = getMockAuthCounts();
	counts.me += 1;

	return NextResponse.json({
		email: 'playwright@local.test',
		name: 'Playwright',
		role: 'ADMIN',
		unit: 'LHG',
		cpf: '359.267.460-94',
	});
}

export async function DELETE(request: Request) {
	if (!mocksEnabled()) {
		return new NextResponse(null, { status: 404 });
	}

	const action = new URL(request.url).searchParams.get('__test');
	if (action !== 'reset-auth-counts') {
		return new NextResponse(null, { status: 404 });
	}

	getMockAuthCounts().me = 0;
	return new NextResponse(null, { status: 204 });
}
