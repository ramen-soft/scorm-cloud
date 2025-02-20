import { Pagination } from "@/components/common/Pagination";
import { getCustomerScorms } from "../../api/customer";
import { useCallback, useEffect, useState } from "react";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { usePagination } from "@/domain/shared/hooks/usePagination";
import { CustomerScormList } from "../CustomerScormList";
import { CustomerScorm } from "../../dto/customer.dto";
import { useParams } from "react-router-dom";
import { AddContentForm } from "../dialogs/AddContentForm";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 15;

export const CustomerScorms = () => {
	const params = useParams();
	const customerId = Number(params.id);
	const [timestamp, setTimestamp] = useState<number>(0);
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
		[customerId, pagination.page, timestamp]
	);

	useEffect(() => {
		if (customerId) {
			getScorms(customerId);
		}
	}, [customerId, getScorms]);

	const onUpdate = () => {
		setTimestamp((ts) => ts + 1);
	};

	return (
		<>
			<div className="flex items-center justify-between space-x-2">
				<Pagination
					{...scorms}
					prevDisabled={pagination.prevDisabled}
					nextDisabled={pagination.nextDisabled}
					onPrevious={() => pagination.prev()}
					onNext={() => pagination.next()}
				/>

				<div className="flex items-center space-x-2 mb-2">
					<AddContentForm
						customerId={customerId}
						onChange={() => onUpdate?.()}
					>
						<Button>Asignar contenido</Button>
					</AddContentForm>
				</div>
			</div>

			<CustomerScormList customerId={customerId} scorms={scorms} />
		</>
	);
};
