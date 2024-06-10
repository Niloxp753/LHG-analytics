/** @format */

'use client';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaUser } from '@/lib/formSchemaUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function FormCreateUser() {
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof formSchemaUser>>({
		resolver: zodResolver(formSchemaUser),
		defaultValues: {
			email: '',
			password: '',
			cpf: '',
			name: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchemaUser>) {
		// try {
		setIsPending(true);
		const email = values.email;
		const password = values.password;
		const name = values.name;
		const cpf = values.cpf;
		form.reset();
		toast.success('Usuário Cadastrado - 200', {
			description: `${name} ${email} ${password} ${cpf} Novo usuário salvo no banco de dados`,
		});

		// } catch (error) {
		// 	toast.error('Algo deu errado - 500', {
		// 		description: 'Erro interno do servidor',
		// 	});
		// 	console.log(error);
		// 	alert(error);
		// 	setIsPending(false);
		// }
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
									required
									placeholder='Nome do usuário'
									className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
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
									{...field}
									required
									placeholder='E-mail do usuário'
									className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
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
									required
									placeholder='CPF do usuário'
									className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
								/>
							</FormControl>
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
									className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
									{...field}
									placeholder='********'
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogClose>
					<Button
						disabled={isPending}
						type='submit'
						className='w-full font-medium disabled:grayscale disabled:cursor-none bg-purple-400 text-zinc-900 text-lg hover:bg-purple-500 duration-300 ease-linear transition-all'>
						{isPending ? (
							<span className='bg-transparent h-6 w-6 border-l border-t border-zinc-50 rounded-full animate-spin' />
						) : (
							<p>Cadastrar</p>
						)}
					</Button>
				</DialogClose>
			</form>
		</Form>
	);
}
