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
		<div className="mb-2 flex space-x-2 items-center">
			<span>
				{page + 1} de {totalPages}
			</span>
			<Button
				disabled={prevDisabled}
				variant={prevDisabled ? "outline" : "default"}
				onClick={() => onPrevious()}
			>
				Anterior
			</Button>
			<Button
				disabled={nextDisabled}
				variant={nextDisabled ? "outline" : "default"}
				onClick={() => onNext()}
			>
				Siguiente
			</Button>
		</div>
	);
};
