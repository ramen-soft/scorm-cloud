import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { ChevronDown } from "lucide-react";

export interface ISidebarItem {
	label: string;
	icon?: ReactNode;
	url?: string;
	children?: ISidebarItem[];
}

type SidebarItemProps = ISidebarItem & {
	level?: number;
	isChild?: boolean;
	children?: SidebarItemProps[];
};
/*
interface SidebarItemProps {
	label: string;
	icon?: ReactNode;
	url?: string;
	level?: number;
	isChild?: boolean;
	children?: SidebarItemProps[];
}
*/
export const SidebarItem = (props: SidebarItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const level = props.level || 0;
	const Comp = (children: ReactNode) =>
		props.url ? <NavLink to={props.url}>{children}</NavLink> : children;
	return (
		<div>
			{Comp(
				props.children ? (
					<div className="text-sm">
						<div
							className="hover:bg-slate-500 p-2 flex items-center gap-2"
							onClick={() => setIsOpen(!isOpen)}
						>
							{props.icon || <div className="w-[16px]"></div>}
							<label
								className={`${
									props.isChild
										? styles["level-" + level]
										: ""
								} block hover:bg-slate-500 flex-1`}
							>
								{props.label}
							</label>

							<ChevronDown
								className={`transition-transform ${
									isOpen ? "" : "-rotate-90"
								} flex-shrink-0`}
							/>
						</div>
						<div className={`${!isOpen ? "hidden" : ""}`}>
							{props.children.map((child, i) => (
								<SidebarItem
									key={props.url + "/" + child.url + "" + i}
									level={level + 1}
									isChild
									{...child}
								/>
							))}
						</div>
					</div>
				) : (
					<div
						className={`text-sm hover:bg-slate-500 p-2 flex items-center gap-2`}
					>
						{props.icon || <div className="w-[16px]"></div>}
						<label
							className={`${
								props.isChild ? styles["level-" + level] : ""
							}`}
						>
							{props.label}
						</label>
					</div>
				)
			)}
		</div>
	);
};
