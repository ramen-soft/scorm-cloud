import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomerDetail } from "@/domain/customer/dto/customer.dto";
import { getCustomer } from "@/domain/customer/api/customer";
import { CustomerBreadcrumb } from "@/domain/customer/components/detail/CustomerBreadcrumb";

export const CustomerDetailPage = () => {
	const params = useParams();
	const customerId = Number(params.id);
	const [isLoading, setIsLoading] = useState(true);

	const [customer, setCustomer] = useState<CustomerDetail | null>();

	useEffect(() => {
		setIsLoading(true);
		getCustomer(Number(customerId))
			.then((customerData) => setCustomer(customerData))
			.finally(() => setIsLoading(false));
	}, [customerId]);

	return (
		<>
			{isLoading ? (
				<p>Cargando...</p>
			) : (
				customer && (
					<div>
						<CustomerBreadcrumb />
						<div className="mb-6">
							<h1 className="text-4xl">{customer.name}</h1>
							<em className="text-xl text-gray-500">
								{customer.cif}
							</em>
						</div>
					</div>
				)
			)}

			<div className="flex mb-6">
				<NavLink
					className="text-slate-700 font-medium px-6 py-1 border-b-2 [&.active]:border-slate-600 [&.active]:font-bold"
					to=""
					end
				>
					Dashboard
				</NavLink>
				<NavLink
					className="text-slate-700 font-medium px-6 py-1 border-b-2 [&.active]:border-slate-600 [&.active]:font-bold"
					to="./products"
				>
					Productos
				</NavLink>

				<NavLink
					className="text-slate-700 font-medium px-6 py-1 border-b-2 [&.active]:border-slate-600 [&.active]:font-bold"
					to="./users"
				>
					Usuarios
				</NavLink>

				{/*
				<NavLink
					className="text-slate-700 font-medium px-6 py-1 border-b-2 [&.active]:border-slate-600 [&.active]:font-bold"
					to="./subscriptions"
				>
					Suscripciones
				</NavLink>
				*/}
				<div className="border-b-2 flex-1"></div>
			</div>

			<Outlet />
		</>
	);
};
