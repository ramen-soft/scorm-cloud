import { Pagination } from "@/components/common/Pagination";
import { getCustomerScorms } from "../../api/customer";
import { useCallback, useEffect, useState } from "react";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { usePagination } from "@/domain/shared/hooks/usePagination";
import { CustomerScormList } from "../CustomerScormList";
import { CustomerScorm } from "../../dto/customer.dto";

const ITEMS_PER_PAGE = 15;

export const CustomerScorms = ({ customerId }: { customerId: number }) => {
	const pagination = usePagination();
	const [scorms, setScorms] = useState<PaginatedResult<CustomerScorm>>({
		count: 0,
		page: 0,
		total: 0,
		totalPages: 0,
		results: [],
	});

	const getScorms = useCallback(
		(customerId: number) => {
			getCustomerScorms({
				customerId: customerId,
				page: Math.max(pagination.page, 0),
				limit: ITEMS_PER_PAGE,
			}).then((scorms) => {
				setScorms(scorms);
				pagination.setTotalPages(scorms.totalPages);
			});
		},
		[customerId, pagination.page]
	);

	useEffect(() => {
		if (customerId) {
			getScorms(customerId);
		}
	}, [customerId, getScorms]);

	return (
		<>
			<Pagination
				{...scorms}
				prevDisabled={pagination.prevDisabled}
				nextDisabled={pagination.nextDisabled}
				onPrevious={() => pagination.prev()}
				onNext={() => pagination.next()}
			/>

			<CustomerScormList scorms={scorms} />
		</>
	);
};
