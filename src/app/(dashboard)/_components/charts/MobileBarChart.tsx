interface MobileBarChartProps {
	title: string;
	labels: string[];
	values: number[];
	colors: string[];
	formatValue: (value: number) => string;
}

export default function MobileBarChart({
	title, labels, values, colors, formatValue,
}: MobileBarChartProps) {
	const maximum = Math.max(0, ...values);

	return (
		<section aria-label={title} className='w-full px-2'>
			<h3 className='mb-6 text-base font-normal text-zinc-100'>{title}</h3>
			<ul role='list' className='space-y-5'>
				{labels.map((label, index) => (
					<li key={`${label}-${index}`}>
						<div className='mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 text-sm leading-5 text-zinc-100'>
							<span className='min-w-0 break-words'>{label}</span>
							<span className='whitespace-nowrap font-semibold tabular-nums'>
								{formatValue(values[index] ?? 0)}
							</span>
						</div>
						<div aria-hidden='true' data-testid='comparison-bar' className='h-3 w-full overflow-hidden rounded-sm bg-zinc-700/40'>
							<div className='h-full rounded-sm' style={{
								width: `${maximum > 0 ? Math.max(0, values[index] ?? 0) / maximum * 100 : 0}%`,
								backgroundColor: colors[index],
							}} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
