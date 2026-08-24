import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { withKpiRequestTimeout } from '../src/http/kpi-request-timeout';

const projectRoot = path.resolve(__dirname, '..');

const kpiReaders = [
	{
		file: 'src/http/company/getCompanyCustom.ts',
		functionName: 'getCompanyCustomCached',
	},
	{
		file: 'src/http/company/getCompanyUnified.ts',
		functionName: 'getCompanyUnifiedCached',
	},
	{
		file: 'src/http/operation/get-governance-custom.ts',
		functionName: 'getOperationCustomCached',
	},
	{
		file: 'src/http/operation/get-governance-unified.ts',
		functionName: 'getGovernanceUnifiedCached',
	},
	{
		file: 'src/http/reservations/get-bookings-custom.ts',
		functionName: 'getReservationsCustomCached',
	},
	{
		file: 'src/http/reservations/getBookingsUnified.ts',
		functionName: 'getBookingsUnifiedCached',
	},
	{
		file: 'src/http/restaurant/get-restaurant-custom.ts',
		functionName: 'getRestaurantsCustomCached',
	},
	{
		file: 'src/http/restaurant/getRestaurantUnified.ts',
		functionName: 'getRestaurantUnifiedCached',
	},
] as const;

type CachedReader = {
	definition: (typeof kpiReaders)[number];
	sourceFile: ts.SourceFile;
	declaration: ts.FunctionDeclaration;
};

async function loadCachedReaders(): Promise<CachedReader[]> {
	return Promise.all(
		kpiReaders.map(async (definition) => {
			const absolutePath = path.join(projectRoot, definition.file);
			const source = await readFile(absolutePath, 'utf8');
			const sourceFile = ts.createSourceFile(
				absolutePath,
				source,
				ts.ScriptTarget.Latest,
				true,
				ts.ScriptKind.TS,
			);
			const declaration = sourceFile.statements.find(
				(statement): statement is ts.FunctionDeclaration =>
					ts.isFunctionDeclaration(statement) &&
					statement.name?.text === definition.functionName,
			);

			expect(
				declaration,
				`${definition.file} deve declarar ${definition.functionName}`,
			).toBeDefined();

			return {
				definition,
				sourceFile,
				declaration: declaration!,
			};
		}),
	);
}

function getDirective(declaration: ts.FunctionDeclaration): string | undefined {
	const firstStatement = declaration.body?.statements[0];
	if (
		!firstStatement ||
		!ts.isExpressionStatement(firstStatement) ||
		!ts.isStringLiteral(firstStatement.expression)
	) {
		return undefined;
	}

	return firstStatement.expression.text;
}

function parameterContainsIdentifier(
	parameter: ts.ParameterDeclaration,
	identifier: string,
): boolean {
	let found = false;

	function visit(node: ts.Node): void {
		if (ts.isIdentifier(node) && node.text === identifier) {
			found = true;
			return;
		}
		ts.forEachChild(node, visit);
	}

	visit(parameter.name);
	return found;
}

function collectForbiddenPrivateBodyAccesses(reader: CachedReader): string[] {
	const violations = new Set<string>();
	const body = reader.declaration.body;
	if (!body) return ['missing function body'];

	function visit(node: ts.Node): void {
		if (
			ts.isIdentifier(node) &&
			(node.text === 'readSession' ||
				node.text === 'requireDashboardSession')
		) {
			violations.add(node.text);
		}

		if (
			(ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
			node.text.includes('/api/me')
		) {
			violations.add('/api/me');
		}

		ts.forEachChild(node, visit);
	}

	visit(body);
	return [...violations];
}

function catchUsesZeroLifetime(catchClause: ts.CatchClause): boolean {
	let matches = false;

	function visit(node: ts.Node): void {
		if (
			ts.isCallExpression(node) &&
			ts.isIdentifier(node.expression) &&
			node.expression.text === 'cacheLife' &&
			node.arguments.length === 1 &&
			ts.isObjectLiteralExpression(node.arguments[0])
		) {
			const values = new Map<string, number>();
			for (const property of node.arguments[0].properties) {
				if (
					ts.isPropertyAssignment(property) &&
					(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
					ts.isNumericLiteral(property.initializer)
				) {
					values.set(property.name.text, Number(property.initializer.text));
				}
			}
			matches =
				values.size === 3 &&
				values.get('stale') === 0 &&
				values.get('revalidate') === 0 &&
				values.get('expire') === 0;
		}

		if (!matches) ts.forEachChild(node, visit);
	}

	visit(catchClause.block);
	return matches;
}

function collectCatchClauses(declaration: ts.FunctionDeclaration) {
	return (
		declaration.body?.statements.flatMap((statement) =>
			ts.isTryStatement(statement) && statement.catchClause
				? [statement.catchClause]
				: [],
		) ?? []
	);
}

function nodeCallsIdentifier(
	node: ts.Node,
	identifier: string,
	stringArgument?: string,
): boolean {
	let matches = false;

	function visit(current: ts.Node): void {
		if (
			ts.isCallExpression(current) &&
			ts.isIdentifier(current.expression) &&
			current.expression.text === identifier &&
			(stringArgument === undefined ||
				(current.arguments.length === 1 &&
					ts.isStringLiteral(current.arguments[0]) &&
					current.arguments[0].text === stringArgument))
		) {
			matches = true;
			return;
		}

		if (!matches) ts.forEachChild(current, visit);
	}

	visit(node);
	return matches;
}

async function expectTaskFourReadersUseZeroLifetime(prefix: string) {
	const readers = (await loadCachedReaders()).filter(({ definition }) =>
		definition.file.startsWith(prefix),
	);
	const violations = readers.flatMap((reader) => {
		const catches = collectCatchClauses(reader.declaration);
		if (catches.length === 0) {
			return [`${reader.definition.file}: missing catch clause`];
		}

		return catches.flatMap((clause, index) =>
			catchUsesZeroLifetime(clause)
				? []
				: [`${reader.definition.file}: catch ${index + 1} must use zero lifetime`],
		);
	});

	expect(violations).toEqual([]);
}

test('declares the 15-minute private dashboard cache lifetime', async () => {
	const configUrl = pathToFileURL(path.join(projectRoot, 'next.config.mjs'));
	const { default: nextConfig } = (await import(configUrl.href)) as {
		default: {
			cacheLife?: Record<
				string,
				{ stale: number; revalidate: number; expire: number }
			>;
		};
	};

	expect(nextConfig.cacheLife?.dashboard_session).toEqual({
		stale: 900,
		revalidate: 900,
		expire: 1800,
	});
});

test('keeps all KPI cache entries private and credential-free at the boundary', async () => {
	const readers = await loadCachedReaders();
	const violations = readers.flatMap((reader) => {
		const problems: string[] = [];
		if (getDirective(reader.declaration) !== 'use cache: private') {
			problems.push('first statement must be "use cache: private"');
		}

		if (
			reader.declaration.parameters.some((parameter) =>
				parameterContainsIdentifier(parameter, 'cookieHeader'),
			)
		) {
			problems.push('cookieHeader must not be a cache-function parameter');
		}

		return problems.map(
			(problem) => `${reader.definition.file}: ${problem}`,
		);
	});

	expect(violations).toEqual([]);
});

test('keeps session and profile reads outside private KPI cache bodies', async () => {
	const readers = await loadCachedReaders();
	const violations = readers.flatMap((reader) => {
		if (getDirective(reader.declaration) !== 'use cache: private') return [];

		return collectForbiddenPrivateBodyAccesses(reader).map(
			(access) => `${reader.definition.file}: ${access}`,
		);
	});

	expect(violations).toEqual([]);
});

test('assigns zero lifetime to captured company-reader failures', async () => {
	const readers = (await loadCachedReaders()).filter(({ definition }) =>
		definition.file.startsWith('src/http/company/'),
	);
	const violations = readers.flatMap((reader) => {
		const catches = collectCatchClauses(reader.declaration);
		if (catches.length === 0) {
			return [`${reader.definition.file}: missing catch clause`];
		}

		return catches.flatMap((clause, index) =>
			catchUsesZeroLifetime(clause)
				? []
				: [`${reader.definition.file}: catch ${index + 1} must use zero lifetime`],
		);
	});

	expect(violations).toEqual([]);
});

test('assigns zero lifetime to captured operation-reader failures', async () => {
	await expectTaskFourReadersUseZeroLifetime('src/http/operation/');
});

test('assigns zero lifetime to captured reservations-reader failures', async () => {
	await expectTaskFourReadersUseZeroLifetime('src/http/reservations/');
});

test('assigns zero lifetime to captured restaurant-reader failures', async () => {
	await expectTaskFourReadersUseZeroLifetime('src/http/restaurant/');
});

test('selects one lifetime after the private reader outcome is known', async () => {
	const readers = await loadCachedReaders();
	const violations = readers.flatMap((reader) => {
		const statements = reader.declaration.body?.statements ?? [];
		const tagIndex = statements.findIndex((statement) =>
			nodeCallsIdentifier(statement, 'cacheTag'),
		);
		const lifetimeIndex = statements.findIndex((statement) =>
			nodeCallsIdentifier(statement, 'cacheLife', 'dashboard_session'),
		);
		const cookieIndex = statements.findIndex((statement) =>
			nodeCallsIdentifier(statement, 'buildAuthCookieHeader'),
		);
		const problems: string[] = [];
		if (lifetimeIndex < 0) {
			problems.push('missing dashboard_session success lifetime');
		}
		if (cookieIndex < 0) {
			problems.push('credentials must be read inside the private entry');
		} else {
			if (tagIndex < 0 || tagIndex >= cookieIndex) {
				problems.push('credentials must be read after cache tags');
			}
			if (lifetimeIndex <= cookieIndex) {
				problems.push('success lifetime must be selected after the outcome');
			}
		}

		return problems.map(
			(problem) => `${reader.definition.file}: ${problem}`,
		);
	});

	expect(violations).toEqual([]);
});

test('rejects KPI requests independently while aborting the underlying operation', async () => {
	const source = await readFile(
		path.join(projectRoot, 'src/http/kpi-request-timeout.ts'),
		'utf8',
	);

	expect(source).toContain('Promise.race');
	expect(source).toContain('controller.abort(error)');
	expect(source).toContain('reject(error)');
	expect(source).toContain('clearTimeout(timeout)');
});

test('aborts an in-flight KPI request with AbortError', async () => {
	const previousTimeout = process.env.KPI_REQUEST_TIMEOUT_MS;
	process.env.KPI_REQUEST_TIMEOUT_MS = '5';
	const controller = new AbortController();
	const operation = new Promise<never>((_resolve, reject) => {
		controller.signal.addEventListener(
			'abort',
			() => reject(controller.signal.reason),
			{ once: true },
		);
	});

	try {
		await expect(withKpiRequestTimeout(operation, controller)).rejects.toMatchObject(
			{ name: 'AbortError' },
		);
		expect(controller.signal.aborted).toBe(true);
	} finally {
		if (previousTimeout === undefined) {
			delete process.env.KPI_REQUEST_TIMEOUT_MS;
		} else {
			process.env.KPI_REQUEST_TIMEOUT_MS = previousTimeout;
		}
	}
});

test('rejects a KPI operation that does not observe the abort signal', async () => {
	const previousTimeout = process.env.KPI_REQUEST_TIMEOUT_MS;
	process.env.KPI_REQUEST_TIMEOUT_MS = '5';
	const controller = new AbortController();
	const operation = new Promise<never>(() => {});

	try {
		const outcome = await Promise.race([
			withKpiRequestTimeout(operation, controller).then(
				() => ({ status: 'resolved' as const }),
				(error) => ({ status: 'rejected' as const, error }),
			),
			new Promise<{ status: 'timed-out' }>((resolve) => {
				setTimeout(() => resolve({ status: 'timed-out' }), 100);
			}),
		]);

		expect(outcome.status).toBe('rejected');
		if (outcome.status === 'rejected') {
			expect(outcome.error).toMatchObject({ name: 'AbortError' });
		}
	} finally {
		if (previousTimeout === undefined) {
			delete process.env.KPI_REQUEST_TIMEOUT_MS;
		} else {
			process.env.KPI_REQUEST_TIMEOUT_MS = previousTimeout;
		}
	}
});
