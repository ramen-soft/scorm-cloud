import { ENDPOINT_URL } from "@/consts";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import {
	CustomerDetail,
	CustomerListItem,
	ScormAssignDTO,
} from "../dto/customer.dto";
import { myFetch } from "@/hooks/useFetch";

export const getCustomers = async ({
	page = 0,
	limit = 15,
}: {
	page: number;
	limit: number;
}): Promise<PaginatedResult<CustomerListItem> | null> => {
	return await myFetch(
		`${ENDPOINT_URL}/customers?page=${page}&limit=${limit}`
	);
};

export const getCustomer = async (
	id: number
): Promise<CustomerDetail | null> => {
	const data = await myFetch(`${ENDPOINT_URL}/customers/${id}`);
	if (data) {
		const result: CustomerDetail = data;
		result.active = Boolean(result.active);
		return result;
	}
	return null;
};

export const getCustomerStats = async (customerId: number) => {
	return await myFetch(`${ENDPOINT_URL}/customers/${customerId}/stats`);
};

export const saveCustomer = async (
	customer: Partial<CustomerDetail>
): Promise<CustomerDetail | null> => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	const data = await myFetch(`${ENDPOINT_URL}/customers`, {
		headers: headers,
		method: "post",
		body: JSON.stringify(customer),
	});
	if (data) {
		return data;
	}
	return null;
};

export const deleteCustomer = async (customer_id: number) => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	return new Promise((resolve, reject) => {
		try {
			myFetch(`${ENDPOINT_URL}/customers/${customer_id}`, {
				headers: headers,
				method: "delete",
			})
				.then((res) => {
					resolve(res);
				})
				.catch((e) => {
					reject(e);
				});
		} catch (e) {
			reject(e);
		}
	});
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
	return await myFetch(
		`${ENDPOINT_URL}/customers/${customerId}/scorms?${urlparams}`
	);
};

export const getCustomerUsers = async ({
	customerId,
	page,
	limit,
}: {
	customerId: number;
	page?: number;
	limit?: number;
}) => {
	const urlparams = new URLSearchParams();
	urlparams.set("page", "" + (page || 0));
	urlparams.set("limit", "" + (limit || 15));
	return await myFetch(
		`${ENDPOINT_URL}/customers/${customerId}/users?${urlparams}`
	);
};

export const getAvailableScorms = async ({
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
	return await myFetch(
		`${ENDPOINT_URL}/customers/${customerId}/available_scorms?${urlparams}`
	);
};

export const assignScorms = async ({
	customerId,
	data,
}: {
	customerId: number;
	data: ScormAssignDTO;
}) => {
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	const res = await myFetch(
		`${ENDPOINT_URL}/customers/${customerId}/assign_scorms`,
		{
			method: "post",
			headers,
			body: JSON.stringify(data),
		}
	);
	if (res && res.done === true) {
		return res;
	} else {
		throw new Error("Error al asignar scorms");
	}
};
