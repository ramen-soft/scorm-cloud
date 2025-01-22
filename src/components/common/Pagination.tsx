import { Button } from "@/components/ui/button";

interface PaginationProps {
	page: number;
	totalPages: number;
	prevDisabled: boolean;
	nextDisabled: boolean;
	onPrevious: () => void;
	onNext: () => void;
}
export const Pagination = ({
	page,
	totalPages,
	prevDisabled,
	nextDisabled,
	onPrevious,
	onNext,
}: PaginationProps) => {
	return (
		<>
			{page + 1} de {totalPages}
			<Button
				variant="outline"
				disabled={prevDisabled}
				onClick={() => onPrevious()}
			>
				Anterior
			</Button>
			<Button
				disabled={nextDisabled}
				variant="outline"
				onClick={() => onNext()}
			>
				Siguiente
			</Button>
		</>
	);
};
