/** @format */

'use client';
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
import { formSchemaLogin } from '@/lib/formSchemaLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function FormLogin() {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof formSchemaLogin>>({
		resolver: zodResolver(formSchemaLogin),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
		try {
			setIsPending(true);
			const email = values.email;
			const password = values.password;
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});
			console.log(response);

			if (!response?.error) {
				router.refresh();
				router.push('/general');
				form.reset();
				toast.success('Usuário Logado - 200', {
					description: 'Credenciais válidas',
				});
			} else {
				toast.error('Não Autorizado - 401', {
					description: 'E-mail ou senha inválidos',
				});
				form.reset();
				setIsPending(false);
			}
		} catch (error) {
			toast.error('Algo deu errado - 500', {
				description: 'Erro interno do servidor',
			});
			console.log(error);
			alert(error);
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
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-zinc-100'>E-mail</FormLabel>
							<FormControl>
								<Input
									className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
									type='email'
									{...field}
									placeholder='email@email.com'
									required
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
									type='password'
									{...field}
									placeholder='********'
									required
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
					{isPending ? (
						<Loader2 className='size-5 animate-spin' />
					) : (
						<p>Entrar</p>
					)}
				</Button>
			</form>
		</Form>
	);
}
