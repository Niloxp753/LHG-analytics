import { NextResponse } from 'next/server';

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ email: string }> },
) {
	if (process.env.PLAYWRIGHT_MOCKS !== 'true') {
		return new NextResponse(null, { status: 404 });
	}

	const { email } = await params;
	const decodedEmail = decodeURIComponent(email);

	return NextResponse.json({
		email: decodedEmail,
		name: 'Playwright',
		role: 'ADMIN',
		unit: 'LHG',
		cpf: '359.267.460-94',
	});
}
