/** @format */

'use client';
// import logoIcon from '@/../public/favicon-uplead-white.png';
// import logo from '@/../public/logo-uplead-white.png';
import {
	Sidebar,
	SidebarBody,
	SidebarItem,
	SidebarLink,
} from '@/app/(dashboard)/components/sidebar-aceternity';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { LiaFunnelDollarSolid } from 'react-icons/lia';
import {
	LuBuilding2,
	LuContact,
	LuMailCheck,
	LuPieChart,
} from 'react-icons/lu';
import { TbSubtask } from 'react-icons/tb';

type SidebarProps = {
	name?: string | null | undefined;
	href?: string;
	slug?: string;
};

export function SidebarDemo(props: SidebarProps) {
	const path = usePathname();
	const links = [
		{
			label: 'Dashboard',
			href: `/dashboard/${props.slug}`,
			icon: (
				<LuPieChart
					className={` ${
						path.endsWith(props.slug!) ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Funil de Vendas',
			href: `/dashboard/${props.slug}/pipeline`,
			icon: (
				<LiaFunnelDollarSolid
					className={` ${
						path.endsWith('/pipeline') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Tarefas',
			href: `/dashboard/${props.slug}/tasks`,
			icon: (
				<TbSubtask
					className={` ${
						path.endsWith('/tasks') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Empresas',
			href: `/dashboard/${props.slug}/companies`,
			icon: (
				<LuBuilding2
					className={` ${
						path.endsWith('/companies') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Contatos',
			href: `/dashboard/${props.slug}/contacts`,
			icon: (
				<LuContact
					className={` ${
						path.endsWith('/contacts') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Oportunidades',
			href: `/dashboard/${props.slug}/quotes`,
			icon: (
				<LuMailCheck
					className={` ${
						path.endsWith('/quotes') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Configurações',
			href: `/dashboard/${props.slug}/settings`,
			icon: (
				<Settings
					className={` ${
						path.endsWith('/settings') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				' md:flex-row w-fit overflow-hidden',
				' fixed z-[999999999999999999999999] left-0  md:border-r-2 border-violet-400 rounded-r-md md:bottom-0 ', // for your use case, use `h-screen` instead of `h-[60vh]`
			)}>
			<Sidebar
				open={open}
				setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10 border-r-2 border-violet-400 rounded-r-md'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
						{/* {open ? (
							<Image
								width={150}
								height={150}
								src={logo}
								alt={'Logo UPLead CRM'}
								className='object-contain flex-shrink-0 h-10 w-fit ml-0 scale-105 mt-2'
							/>
						) : (
							<Image
								width={50}
								height={50}
								src={logoIcon}
								alt={'Logo UPLead CRM'}
								className='object-contain flex-shrink-0 h-10 mt-2'
							/>
						)} */}
						<div className='mt-8 flex flex-col gap-2'>
							{links.map((link, idx) => (
								<SidebarLink
									key={idx}
									link={link}
								/>
							))}
						</div>
					</div>
					<SidebarItem
						label={props?.name}
						icon={
							<CgProfile
								className={`${
									path == '/dashboard/profile' ? 'text-zinc-950' : '*:'
								} text-zinc-200 group-hover:text-zinc-950 font-medium h-5 w-5 flex-shrink-0 `}
							/>
						}
					/>
				</SidebarBody>
			</Sidebar>
		</div>
	);
}
