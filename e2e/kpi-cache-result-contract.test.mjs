import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(
	new URL('../src/http/kpi-cache-result.ts', import.meta.url),
);
const source = readFileSync(sourcePath, 'utf8');

assert.doesNotMatch(
	source,
	/const\s+\w+\s*=\s*new\s+Map\s*</,
);
assert.doesNotMatch(source, /failureRevision/);

const readerPaths = [
	'../src/http/company/getCompanyCustom.ts',
	'../src/http/company/getCompanyUnified.ts',
	'../src/http/restaurant/get-restaurant-custom.ts',
	'../src/http/restaurant/getRestaurantUnified.ts',
	'../src/http/reservations/get-bookings-custom.ts',
	'../src/http/reservations/getBookingsUnified.ts',
	'../src/http/operation/get-governance-custom.ts',
	'../src/http/operation/get-governance-unified.ts',
];

for (const relativePath of readerPaths) {
	const readerSource = readFileSync(
		fileURLToPath(new URL(relativePath, import.meta.url)),
		'utf8',
	);
	const cacheLifeCalls = [...readerSource.matchAll(/\bcacheLife\s*\(/g)];
	assert.equal(
		cacheLifeCalls.length,
		3,
		`${relativePath} must select cacheLife from the failure, historical, or live branch`,
	);
	const outcomeIndex = readerSource.indexOf('} catch (error) {');
	assert.notEqual(
		outcomeIndex,
		-1,
		`${relativePath} must capture the request outcome before selecting cacheLife`,
	);
	assert.ok(
		cacheLifeCalls.every((call) => (call.index ?? -1) > outcomeIndex),
		`${relativePath} must not execute cacheLife before the request outcome is known`,
	);
}
