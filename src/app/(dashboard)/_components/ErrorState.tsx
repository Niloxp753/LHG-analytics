/** @format */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ErrorState({
	title = 'Erro ao carregar',
	description = 'Não foi possível carregar os dados.',
}: {
	title?: string;
	description?: string;
}) {
	return (
		<div className='w-full px-3 md:px-0'>
			<Alert variant='destructive'>
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</Alert>
		</div>
	);
}
