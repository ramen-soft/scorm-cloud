export interface PaginatedResult<T> {
	page: number;
	count: number;
	results: T[];
	total: number;
}
