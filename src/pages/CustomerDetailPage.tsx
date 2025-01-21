import { Button } from "@/components/ui/button";
import { CustomerScormList } from "@/domain/customer/components/CustomerScormList";
import { getCustomer, getCustomerScorms } from "@/domain/customer/api/customer";
import {
	CustomerDetail,
	CustomerScorm,
} from "@/domain/customer/dto/customer.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CustomerDetailPage = () => {
	const { id } = useParams();

	const [data, setData] = useState<CustomerDetail | null>();
	const [scorms, setScorms] = useState<PaginatedResult<CustomerScorm>>({
		page: 0,
		count: 15,
		total: 0,
		results: [],
	});

	const [page, setPage] = useState(0);
	const [limit] = useState(15);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getCustomer(Number(id)).then((result) => {
			setPage(0);
			setData(result);
		});
	}, [id]);

	useEffect(() => {
		if (data && data.id) {
			getCustomerScorms({
				customerId: data.id,
				page: Math.max(page, 0),
				limit,
			}).then((scorms) => {
				setTotalPages(scorms.total);
				setScorms(scorms);
			});
		}
	}, [data, page, limit]);
	return (
		<>
			{data ? (
				<div>
					<h1 className="text-4xl">{data.name}</h1>
					<h2 className="text-zinc-500">{data.guid}</h2>
					{page} of {totalPages}
					<Button
						variant="outline"
						disabled={page <= 0}
						onClick={() => (page > 0 ? setPage(page - 1) : null)}
					>
						Anterior
					</Button>
					<Button
						disabled={page + 1 >= totalPages}
						variant="outline"
						onClick={() => setPage(page + 1)}
					>
						Siguiente
					</Button>
					<CustomerScormList scorms={scorms} />
				</div>
			) : (
				<p>Sin datos.</p>
			)}
		</>
	);
};
