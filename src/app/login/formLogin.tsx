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
import { formSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FormLogin() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
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
				router.push('/dashboard');
			} else {
				alert('Email ou senha invalidos');
			}
		} catch (error) {
			console.log(error);
			alert(error);
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
					type='submit'
					className='w-full font-medium bg-purple-400 text-zinc-900 text-lg hover:bg-purple-500 duration-300 ease-linear transition-all'>
					Entrar
				</Button>
			</form>
		</Form>
	);
}
