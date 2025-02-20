import { Home, LogOut, Package2, User } from "lucide-react";
import { ISidebarItem, SidebarItem } from "./SidebarItem";
import { Button } from "../ui/button";
import { useAuth } from "@/auth/hooks/useAuth";

export const Sidebar = ({ open = false }: { open?: boolean }) => {
	const openStyle = open ? "translate-x-0" : "translate-x-[-200px]";
	const { logout } = useAuth();

	const links: ISidebarItem[] = [
		{ label: "Home", icon: <Home />, url: "/" },
		{
			label: "Clientes",
			icon: <User />,
			url: "customers",
		},
		{
			label: "Contenidos",
			icon: <Package2 />,
			url: "scorms",
		},
		/*
		{
			label: "Item 1",
			icon: <Package2 />,
			children: [
				{ label: "Item 1.1", url: "item1/item1_1" },
				{ label: "Item 1.2", url: "item1/item1_2" },
			],
		},
		{ label: "Item 2", icon: <Workflow />, url: "item2" },
		 */
	];

	return (
		<div
			className={`${openStyle} w-[200px] transition-slide bg-slate-800 text-white h-dvh fixed pt-4 flex flex-col`}
		>
			<div className="flex-1 overflow-auto">
				{links.map((link, i) => (
					<SidebarItem
						key={i + "-" + link.url}
						label={link.label}
						icon={link.icon}
						url={link.url}
						children={link.children}
					/>
				))}
			</div>

			<div className="p-2">
				<Button
					variant="secondary"
					className="w-full"
					onClick={() => logout()}
				>
					<LogOut /> Cerrar sesión
				</Button>
			</div>
		</div>
	);
};
