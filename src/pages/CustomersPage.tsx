import { getCustomers } from "@/domain/customer/api/customer";
import { CustomerList } from "@/domain/customer/components/CustomerList";
import { CustomerListItem } from "@/domain/customer/dto/customer.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { useEffect, useState } from "react";

export const CustomersPage = () => {
	const [shouldUpdate, setShouldUpdate] = useState<number>();
	const [results, setResults] = useState<PaginatedResult<CustomerListItem>>({
		page: 0,
		count: 15,
		results: [],
		total: 0,
	});

	useEffect(() => {
		getCustomers({ page: 0, limit: 15 }).then((result) => {
			if (result) {
				setResults(result);
			}
		});
	}, [shouldUpdate]);

	return (
		<>
			<h1 className="text-4xl mb-4">Clientes</h1>
			<CustomerList
				onUpdate={() => setShouldUpdate(Math.random())}
				customers={results}
			/>
		</>
	);
};
