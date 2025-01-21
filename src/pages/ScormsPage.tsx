import { getScorms } from "@/domain/content/api/content";
import { ScormList } from "@/domain/content/components/ScormList";
import { ScormListItem } from "@/domain/content/dto/content.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { useEffect, useState } from "react";

export const ScormsPage = () => {
	const [results, setResults] = useState<PaginatedResult<ScormListItem>>({
		page: 0,
		count: 15,
		results: [],
		total: 0,
	});

	useEffect(() => {
		getScorms({ page: 0, limit: 15 }).then((result) => {
			if (result) {
				setResults(result);
			}
		});
	}, []);

	return (
		<>
			<h1 className="text-4xl mb-4">Contenidos</h1>
			<ScormList scorms={results} />
		</>
	);
};
