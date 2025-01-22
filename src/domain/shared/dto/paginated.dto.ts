export interface PaginatedResult<T> {
	page: number;
	count: number;
	results: T[];
	totalPages: number;
	total: number;
}
