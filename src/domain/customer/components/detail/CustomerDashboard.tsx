import { useEffect, useState } from "react";
import { CustomerBreadcrumb } from "./CustomerBreadcrumb";
import { CustomerStats } from "./CustomerStats";
import { CustomerDetail } from "../../dto/customer.dto";
import { getCustomer } from "../../api/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerScorms } from "./CustomerScorms";

export const CustomerDashboard = ({ customerId }: { customerId: number }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [customer, setCustomer] = useState<CustomerDetail | null>();

	useEffect(() => {
		setIsLoading(true);
		getCustomer(customerId)
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

						<Tabs defaultValue="dash">
							<TabsList>
								<TabsTrigger value="dash">
									Dashboard
								</TabsTrigger>
								<TabsTrigger value="scorms">
									Productos
								</TabsTrigger>
								<TabsTrigger value="users">
									Usuarios
								</TabsTrigger>
								<TabsTrigger value="subscriptions">
									Suscripciones
								</TabsTrigger>
							</TabsList>
							<TabsContent value="dash">
								<CustomerStats customerId={customerId} />
							</TabsContent>
							<TabsContent value="scorms">
								<CustomerScorms customerId={customerId} />
							</TabsContent>
							<TabsContent value="users">Usuarios</TabsContent>
							<TabsContent value="subscriptions">
								Suscripciones
							</TabsContent>
						</Tabs>
					</div>
				)
			)}
		</>
	);
};
