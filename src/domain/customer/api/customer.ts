import { ENDPOINT_URL } from "@/consts";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { CustomerDetail, CustomerListItem } from "../dto/customer.dto";

export const getCustomers = async ({
	page = 0,
	limit = 15,
}: {
	page: number;
	limit: number;
}): Promise<PaginatedResult<CustomerListItem> | null> => {
	const req = await fetch(
		`${ENDPOINT_URL}/customers?page=${page}&limit=${limit}`
	);
	return req.json();
};

export const getCustomer = async (
	id: number
): Promise<CustomerDetail | null> => {
	const req = await fetch(`${ENDPOINT_URL}/customers/${id}`);
	const data = await req.json();
	if (data) {
		const result: CustomerDetail = data;
		result.active = Boolean(result.active);
		return result;
	}
	return null;
};

export const saveCustomer = async (
	customer: Partial<CustomerDetail>
): Promise<CustomerDetail | null> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	const req = await fetch(`${ENDPOINT_URL}/customers`, {
		headers: headers,
		method: "post",
		body: JSON.stringify(customer),
	});
	const data = await req.json();
	if (data) {
		return data;
	}
	return null;
};

export const getCustomerScorms = async ({
	customerId,
	page,
	limit,
}: {
	customerId: number;
	page: number;
	limit: number;
}) => {
	const urlparams = new URLSearchParams();
	urlparams.set("page", "" + (page || 0));
	urlparams.set("limit", "" + (limit || 15));
	const req = await fetch(
		`${ENDPOINT_URL}/customers/${customerId}/scorms?${urlparams}`
	);
	return await req.json();
};
