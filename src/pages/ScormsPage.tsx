import { Pagination } from "@/components/common/Pagination";
import { getScorms } from "@/domain/content/api/content";
import { ScormList } from "@/domain/content/components/ScormList";
import { ScormListItem } from "@/domain/content/dto/content.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { usePagination } from "@/domain/shared/hooks/usePagination";
import { useEffect, useState } from "react";

export const ScormsPage = () => {
	const pagination = usePagination();
	const [timestamp, setTimestamp] = useState(0);
	const [results, setResults] = useState<PaginatedResult<ScormListItem>>({
		page: 0,
		count: 15,
		results: [],
		total: 0,
		totalPages: 0,
	});

	useEffect(() => {
		getScorms({ page: pagination.page, limit: 15 }).then((result) => {
			if (result) {
				pagination.setTotalPages(result.totalPages);
				setResults(result);
			}
		});
	}, [pagination.page, timestamp]);

	return (
		<>
			<h1 className="text-4xl mb-4">Contenidos</h1>
			<Pagination
				{...results}
				prevDisabled={pagination.prevDisabled}
				nextDisabled={pagination.nextDisabled}
				onPrevious={() => pagination.prev()}
				onNext={() => pagination.next()}
			/>
			<ScormList
				onChange={() => setTimestamp((t) => t + 1)}
				scorms={results}
			/>
		</>
	);
};
