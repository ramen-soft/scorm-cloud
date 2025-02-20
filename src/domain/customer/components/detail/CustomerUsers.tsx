import { useEffect, useState } from "react";
import { getCustomerUsers } from "../../api/customer";
import { useParams } from "react-router-dom";
import { CustomerUser } from "../../dto/customer.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/domain/shared/hooks/usePagination";
import { CustomerUserList } from "../CustomerUserList";
import { Button } from "@/components/ui/button";
import { ENDPOINT_URL } from "@/consts";

export const CustomerUsers = () => {
	const params = useParams();
	const customerId = Number(params["id"]);
	const pagination = usePagination();
	const [users, setUsers] = useState<PaginatedResult<CustomerUser>>({
		count: 0,
		page: 0,
		results: [],
		total: 0,
		totalPages: 0,
	});

	useEffect(() => {
		getCustomerUsers({ customerId }).then((data) => {
			setUsers(data);
			pagination.setTotalPages(data.totalPages);
		});
	}, [customerId]);

	const handleStudentReports = () => {
		window.open(`${ENDPOINT_URL}/customers/${customerId}/reports/students`);
	};

	const handleUsageReports = () => {
		window.open(`${ENDPOINT_URL}/customers/${customerId}/reports/usage`);
	};

	return (
		<>
			<div className="flex items-center ">
				<Pagination
					{...users}
					prevDisabled={pagination.prevDisabled}
					nextDisabled={pagination.nextDisabled}
					onPrevious={() => pagination.prev()}
					onNext={() => pagination.next()}
				/>
				<span className="flex-1"></span>
				<div className="mb-2 space-x-2">
					<Button onClick={() => handleStudentReports()}>
						Informe por alumno
					</Button>
					<Button onClick={() => handleUsageReports()}>
						Informe de consumo
					</Button>
				</div>
			</div>

			<CustomerUserList users={users} />
		</>
	);
};
