/** @format */
'use client';

import { updateUserAction } from '@/actions/updateUser';
import { userActionFailureCopy } from '@/actions/user-action-result';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { UpdateUserInput, User } from '@/types/user';
import { formSchemaUserUpdate } from '@/lib/formSchemaUserUpdate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	ADMIN_ROLE,
	ADMIN_UNIT,
	ROLE_OPTIONS,
	ROLE_VALUES,
	UNIT_LABELS,
	UNIT_OPTIONS,
	normalizeRole,
	normalizeUnit,
	type AccessUnit,
} from '@/lib/access-control';
import { formatCpf, normalizeCpf } from '@/lib/cpf';

interface FormUpdateProps {
	user: UpdateUserInput | User;
}

export default function FormUpdate({ user }: FormUpdateProps) {
	const [isPending, setIsPending] = useState(false);
	const normalizedRole = normalizeRole(user.role) ?? ROLE_VALUES[0];
	const normalizedUnit = normalizeUnit(user.unit);
	const normalizedUnitValue =
		normalizedRole === ADMIN_ROLE ? ADMIN_UNIT : (normalizedUnit ?? '');
	const form = useForm<z.infer<typeof formSchemaUserUpdate>>({
		resolver: zodResolver(formSchemaUserUpdate),
		defaultValues: {
			email: user.email,
			cpf: normalizeCpf(user.cpf),
			name: user.name,
			password: '',
			unidade: normalizedUnitValue,
			role: normalizedRole,
		},
	});
	// eslint-disable-next-line react-hooks/incompatible-library
	const selectedRole = form.watch('role');
	const isAdminRole = selectedRole === ADMIN_ROLE;

	async function onSubmit(values: z.infer<typeof formSchemaUserUpdate>) {
		setIsPending(true);
		try {
			const email = values.email;
			const name = values.name;
			const cpf = values.cpf;
			const password = values.password;
			const role = values.role;
			const id = user.id;
			const unit = values.unidade as AccessUnit;

			const payload = {
				email,
				name,
				cpf,
				role,
				unit,
				id,
				...(password ? { password } : {}),
			};

			const result = await updateUserAction(payload);
			if (!result.ok) {
				const copy = userActionFailureCopy(result.code);
				toast.error(copy.title, { description: copy.description });
				return;
			}
			form.reset();
			toast.success('Usuário Atualizado - 200', {
				description: `${name} - Usuário atualizado no banco de dados`,
			});
		} catch (error) {
			console.error(error);
			toast.error('Erro inesperado', {
				description: 'Não foi possível atualizar o usuário. Tente novamente.',
			});
		} finally {
			setIsPending(false);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='name'
								className='text-zinc-100'>
								Nome
							</FormLabel>
							<FormControl>
								<Input
									id='name'
									{...field}
									placeholder='Nome do usuário'
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='email'
								className='text-zinc-100'>
								E-mail
							</FormLabel>
							<FormControl>
								<Input
									id='email'
									type='email'
									{...field}
									placeholder='E-mail do usuário'
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='cpf'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='cpf'
								className='text-zinc-100'>
								CPF
							</FormLabel>
							<FormControl>
								<Input
									id='cpf'
									{...field}
									value={formatCpf(field.value)}
									onChange={(event) =>
										field.onChange(normalizeCpf(event.target.value))
									}
									placeholder='CPF do usuário'
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='role'
								className='text-zinc-100'>
								Cargo
							</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									if (value === ADMIN_ROLE) {
										form.setValue('unidade', ADMIN_UNIT);
										return;
									}
									if (form.getValues('unidade') === ADMIN_UNIT) {
										form.setValue('unidade', '');
									}
								}}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione um cargo' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ROLE_OPTIONS.map((role) => (
										<SelectItem
											key={role.value}
											value={role.value}>
											{role.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='unidade'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='unidade'
								className='text-zinc-100'>
								Unidade
							</FormLabel>
							<Select
								onValueChange={field.onChange}
								disabled={isAdminRole}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione uma unidade' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{isAdminRole ? (
										<SelectItem value={ADMIN_UNIT}>
											{UNIT_LABELS[ADMIN_UNIT]}
										</SelectItem>
									) : (
										UNIT_OPTIONS.map((unit) => (
											<SelectItem
												key={unit.value}
												value={unit.value}>
												{unit.label}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-zinc-100'>Senha</FormLabel>
							<FormControl>
								<Input
									type='password'
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
									{...field}
									placeholder='Deixe em branco para manter'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isPending}
					type='submit'
					className='w-full font-medium disabled:grayscale disabled:cursor-none bg-purple-400 text-zinc-900 text-lg hover:bg-purple-500 duration-300 ease-linear transition-all'>
					{isPending ? <Loader2 className='animate-spin' /> : <p>Atualizar</p>}
				</Button>
			</form>
		</Form>
	);
}
