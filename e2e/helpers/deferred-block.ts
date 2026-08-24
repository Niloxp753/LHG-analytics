function firstExistingIndex(...indexes: number[]): number {
	const matches = indexes.filter((index) => index >= 0);
	return matches.length > 0 ? Math.min(...matches) : -1;
}

export function deferredBlock(source: string, name: string): string {
	const nameIndex = firstExistingIndex(
		source.indexOf(`name='${name}'`),
		source.indexOf(`name="${name}"`),
	);
	if (nameIndex < 0) {
		throw new Error(`DeferredChartMount "${name}" was not found`);
	}

	const blockStart = source.lastIndexOf('<DeferredChartMount', nameIndex);
	if (blockStart < 0) {
		throw new Error(`DeferredChartMount "${name}" has no opening boundary`);
	}

	const closingTag = '</DeferredChartMount>';
	const blockEnd = source.indexOf(closingTag, nameIndex);
	if (blockEnd <= blockStart) {
		throw new Error(`DeferredChartMount "${name}" has no closing boundary`);
	}

	return source.slice(blockStart, blockEnd + closingTag.length);
}
