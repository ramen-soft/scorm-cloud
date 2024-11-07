import { RouteObject } from "react-router-dom";
import { AuthenticationGuard } from "@/auth/components/AuthenticationGuard";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";

const routes: RouteObject[] = [
	{
		children: [
			{
				element: <AuthenticationGuard guardType="authenticated" />,
				children: [
					{
						path: "/",
						element: <MainLayout />,
						children: [
							{
								path: "/",
								element: <HomePage />,
							},
						],
					},
				],
			},
			{
				element: <AuthenticationGuard guardType="unauthenticated" />,
				children: [
					{
						path: "/login",
						element: <LoginPage />,
					},
				],
			},
		],
	},
];

export default routes;
