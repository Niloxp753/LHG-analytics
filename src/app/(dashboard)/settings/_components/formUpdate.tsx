/** @format */
'use client';

import { updateUserAction } from '@/actions/updateUser';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { IUserUp } from '@/http/user/updateUser';
import { formSchemaUserUpdate } from '@/lib/formSchemaUserUpdate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface FormUpdateProps {
	user: IUserUp;
}

export default function FormUpdate({ user }: FormUpdateProps) {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof formSchemaUserUpdate>>({
		resolver: zodResolver(formSchemaUserUpdate),
		defaultValues: {
			email: user.email,
			password: '',
			cpf: user.cpf,
			name: user.name,
			unidade: String(user.companyId),
			role: user.role ?? 'MANAGER',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchemaUserUpdate>) {
		try {
			setIsPending(true);
			const email = values.email;
			const password = values.password !== '' ? values.password : '';
			const name = values.name;
			const cpf = values.cpf;
			const role = values.role;
			const id = user.id;
			const companyId = Number(values.unidade);

			await updateUserAction({
				email,
				password,
				name,
				cpf,
				role,
				companyId,
				id,
			});
			form.reset();
			toast.success('Usuário Atualizado - 200', {
				description: `${name} - Usuário atualizado no banco de dados`,
			});
		} catch (error) {
			toast.error('Algo deu errado - 500', {
				description: 'Tente novamente',
			});

			setIsPending(false);
		}
		setIsPending(false);
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
									placeholder='CPF do usuário'
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
								/>
							</FormControl>
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
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione um cargo' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={'MANAGER'}>Gerente</SelectItem>
									<SelectItem value={'ADMIN'}>Administrador</SelectItem>
								</SelectContent>
							</Select>
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
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione uma unidade' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={'1'}>Lush Ipiranga</SelectItem>
									<SelectItem value={'2'}>Lush Lapa</SelectItem>
									<SelectItem
										disabled
										value={'3'}>
										Andar de Cima
									</SelectItem>
									<SelectItem
										disabled
										value={'4'}>
										Tout Campinas
									</SelectItem>
								</SelectContent>
							</Select>
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
									className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
									{...field}
									placeholder='********'
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					disabled={isPending}
					type='submit'
					className='w-full font-medium disabled:grayscale disabled:cursor-none bg-purple-400 text-zinc-900 text-lg hover:bg-purple-500 duration-300 ease-linear transition-all'>
					{isPending ? (
						<span className='bg-transparent h-6 w-6 border-l border-t border-zinc-50 rounded-full animate-spin' />
					) : (
						<p>Atualizar</p>
					)}
				</Button>
			</form>
		</Form>
	);
}
