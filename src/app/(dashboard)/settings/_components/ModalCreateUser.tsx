/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogTrigger,
	DialogOverlay,
} from '@/components/ui/dialog';
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
import { UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUserAction } from '@/actions/createUser';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	ADMIN_ROLE,
	ADMIN_UNIT,
	ROLE_OPTIONS,
	ROLE_VALUES,
	UNIT_LABELS,
	UNIT_OPTIONS,
	type AccessUnit,
} from '@/lib/access-control';

export function ModalCreateUser() {
	const [isPending, setIsPending] = useState(false);
	const [modal, setModal] = useState(false);
	const form = useForm<z.infer<typeof formSchemaUser>>({
		resolver: zodResolver(formSchemaUser),
		defaultValues: {
			email: '',
			password: '',
			cpf: '',
			name: '',
			unidade: '',
			role: ROLE_VALUES[0],
		},
	});
	// eslint-disable-next-line react-hooks/incompatible-library
	const selectedRole = form.watch('role');
	const isAdminRole = selectedRole === ADMIN_ROLE;

	async function onSubmit(values: z.infer<typeof formSchemaUser>) {
		try {
			setIsPending(true);
			const email = values.email;
			const password = values.password;
			const name = values.name;
			const cpf = values.cpf;
			const role = values.role;
			const unit = values.unidade as AccessUnit;
			await createUserAction({ email, password, name, cpf, role, unit });
			form.reset();
			toast.success('Usuário Cadastrado - 204', {
				description: `${name} - Novo usuário salvo no banco de dados`,
			});
			setModal(false);
		} catch (error) {
			console.error(error);
			toast.error('Algo deu errado - 500', {
				description: 'Tente novamente',
			});
			setModal(true);
			setIsPending(false);
		}
		setIsPending(false);
	}
	return (
		<Dialog open={modal}>
			<DialogTrigger
				onClick={() => setModal(true)}
				asChild>
				<Button className='flex gap-4 w-full md:w-fit text-zinc-800 font-semibold bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear uppercase md:capitalize'>
					Adicionar <UserPlus size={20} />
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px] text-zinc-100 max-w-sm rounded-md dark'>
				<DialogClose
					onClick={() => setModal(false)}
					className=' ml-auto text-zinc-500 hover:text-zinc-100 duration-300 transition-all ease-linear'>
					<X />
				</DialogClose>
				<DialogHeader>
					<DialogTitle className='text-xl'>Cadastrar Usuário</DialogTitle>
					<DialogDescription className='text-zinc-400 text-balance text-xs'>
						Preencha os campos para cadastrar um novo usuário
					</DialogDescription>
				</DialogHeader>
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
											required
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
											required
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
											className='bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
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
								<span className='bg-transparent h-6 w-6 border-l border-t border-zinc-50 rounded-full animate-spin' />
							) : (
								<p>Cadastrar</p>
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
			<DialogOverlay onClick={() => setModal(false)} />
		</Dialog>
	);
}
