import { useState } from "react";

export const usePagination = () => {
	const [page, setPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);

	const prevDisabled = page <= 0;
	const nextDisabled = page + 1 >= totalPages;

	const prev = () => {
		if (!prevDisabled) setPage((page) => page - 1);
	};
	const next = () => {
		if (!nextDisabled) setPage((page) => page + 1);
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
