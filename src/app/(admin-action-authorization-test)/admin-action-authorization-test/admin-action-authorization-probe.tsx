'use client';

import { createUserAction } from '@/actions/createUser';
import { deleteUserAction } from '@/actions/deleteUser';
import { getAllUsersAction } from '@/actions/getAllUsers';
import { updateUserAction } from '@/actions/updateUser';
import { useState } from 'react';

type ProbeName = 'create' | 'delete' | 'list' | 'update' | 'update-invalid';

const PROBES = {
	create: () =>
		createUserAction({
			email: 'created@action.test',
			name: 'Created User',
			cpf: '359.267.460-94',
			password: 'test-password',
			role: 'GERENTE_GERAL',
			unit: 'LUSH_LAPA',
		}),
	delete: () => deleteUserAction('42'),
	list: () => getAllUsersAction(),
	update: () =>
		updateUserAction({
			id: '42',
			email: 'updated@action.test',
			name: 'Updated User',
			cpf: '359.267.460-94',
			role: 'GERENTE_GERAL',
			unit: 'LUSH_LAPA',
		}),
	'update-invalid': () =>
		updateUserAction({
			email: 'invalid@action.test',
			name: 'Invalid User',
			cpf: '359.267.460-94',
			role: 'GERENTE_GERAL',
			unit: 'LUSH_LAPA',
		}),
};

function getResultLabel(probe: ProbeName, value: unknown): string {
	if (!value || typeof value !== 'object' || !('ok' in value)) {
		return `${probe}:INVALID`;
	}

	if (value.ok === true) {
		return `${probe}:SUCCESS`;
	}

	if ('code' in value && typeof value.code === 'string') {
		return `${probe}:${value.code}`;
	}

	return `${probe}:INVALID`;
}

export default function AdminActionAuthorizationProbe() {
	const [result, setResult] = useState('idle');
	const [value, setValue] = useState('');

	async function invoke(probe: ProbeName) {
		setResult('pending');
		setValue('');
		try {
			const actionValue: unknown = await PROBES[probe]();
			setResult(getResultLabel(probe, actionValue));
			setValue(JSON.stringify(actionValue) ?? 'undefined');
		} catch {
			setResult(`${probe}:THREW`);
			setValue('threw');
		}
	}

	return (
		<main>
			{(Object.keys(PROBES) as ProbeName[]).map((probe) => (
				<button
					key={probe}
					type='button'
					data-testid={`${probe}-action`}
					onClick={() => invoke(probe)}>
					{probe}
				</button>
			))}
			<p data-testid='action-result'>{result}</p>
			<pre data-testid='action-value'>{value}</pre>
		</main>
	);
}
