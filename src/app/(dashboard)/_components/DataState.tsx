/** @format */

'use client';

import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface DataStateProps {
	isLoading?: boolean;
	error?: string | boolean | null;
	errorTitle?: string;
	errorDescription?: string;
	alertClassName?: string;
	skeletonClassName?: string;
	skeleton?: React.ReactNode;
	children?: React.ReactNode;
}

export default function DataState({
	isLoading,
	error,
	errorTitle = 'Erro ao carregar',
	errorDescription,
	alertClassName,
	skeletonClassName,
	skeleton,
	children,
}: DataStateProps) {
	if (error) {
		const description =
			errorDescription ??
			(typeof error === 'string'
				? error
				: 'Tente novamente ou ajuste os filtros.');

		return (
			<Alert variant='destructive' className={cn('w-full', alertClassName)}>
				<AlertTitle>{errorTitle}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</Alert>
		);
	}

	if (isLoading) {
		return (
			<>
				{skeleton ?? (
					<Skeleton className={cn('h-40 w-full', skeletonClassName)} />
				)}
			</>
		);
	}

	return <>{children}</>;
}
