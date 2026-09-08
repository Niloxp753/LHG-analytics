'use client';

export type ChartMountPlaceholderProps = {
	minHeight: number;
	name: string;
};

export default function ChartMountPlaceholder({
	minHeight,
	name,
}: ChartMountPlaceholderProps) {
	return (
		<div
			className='w-full rounded-xl bg-zinc-900/80 p-4'
			style={{ minHeight }}
			data-chart-placeholder={name}
			role='status'
			aria-label='Carregando gráfico'
			aria-live='off'>
			<div className='h-5 w-44 animate-pulse rounded bg-zinc-800' aria-hidden='true' />
			<div
				className='mt-4 h-[calc(100%_-_2.25rem)] min-h-56 w-full animate-pulse rounded-lg bg-zinc-800/70'
				aria-hidden='true'
			/>
		</div>
	);
}
