import { Sidebar } from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
	return (
		<>
			<Sidebar open />
			<main className="ml-[200px] p-4">
				<Outlet />
			</main>
		</>
	);
};
