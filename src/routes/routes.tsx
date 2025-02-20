import { RouteObject } from "react-router-dom";
import { AuthenticationGuard } from "@/auth/components/AuthenticationGuard";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { CustomerDetailPage } from "@/pages/CustomerDetailPage";
import { ScormsPage } from "@/pages/ScormsPage";
import { ScormDetailPage } from "@/pages/ScormDetailPage";
import { CustomerScorms } from "@/domain/customer/components/detail/CustomerScorms";
import { CustomerDashboard } from "@/domain/customer/components/detail/CustomerDashboard";
import { CustomerUsers } from "@/domain/customer/components/detail/CustomerUsers";
import { CustomerSubscriptions } from "@/domain/customer/components/detail/CustomerSubscriptions";

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
								path: "/scorms",
								children: [
									{
										path: "",
										element: <ScormsPage />,
									},
									{
										path: ":id",
										element: <ScormDetailPage />,
									},
								],
							},
							{
								path: "/customers",
								children: [
									{
										path: "",
										element: <CustomersPage />,
									},
									{
										path: ":id",
										element: <CustomerDetailPage />,
										children: [
											{
												path: "",
												element: <CustomerDashboard />,
											},
											{
												path: "/customers/:id/products",
												element: <CustomerScorms />,
											},
											{
												path: "/customers/:id/users",
												element: <CustomerUsers />,
											},
											{
												path: "/customers/:id/subscriptions",
												element: (
													<CustomerSubscriptions />
												),
											},
										],
									},
								],
							},
							{
								path: "/",
								element: <HomePage />,
							},
						],
					},
				],
			},
			{
				element: (
					<AuthenticationGuard
						redirectPath="/"
						guardType="unauthenticated"
					/>
				),
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
