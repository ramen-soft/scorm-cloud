import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (
	{ noParams }: { noParams?: boolean } = { noParams: false }
) => {
	const [params, setParams] = useSearchParams();
	const [page, setPage] = useState<number>(
		noParams ? 0 : Number(params.get("page")) || 0
	);
	const [totalPages, setTotalPages] = useState<number>(0);

	const prevDisabled = page <= 0;
	const nextDisabled = page + 1 >= totalPages;

	const prev = () => {
		if (!prevDisabled) {
			setPage((page) => page - 1);
			if (!noParams) {
				setParams({ ...params, ...{ page: page - 1 } });
			}
		}
	};
	const next = () => {
		if (!nextDisabled) {
			setPage((page) => page + 1);
			if (!noParams) {
				setParams({ ...params, ...{ page: page + 1 } });
			}
		}
	};
	return {
		page,
		setPage,
		setTotalPages,
		next,
		prev,
		prevDisabled,
		nextDisabled,
	};
};
