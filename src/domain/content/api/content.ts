import { ENDPOINT_URL } from "@/consts";
import { myFetch } from "@/hooks/useFetch";

export const getScorms = async ({
	page = 0,
	limit = 15,
}: {
	page: number;
	limit: number;
}) => {
	return await myFetch(`${ENDPOINT_URL}/scorms?page=${page}&limit=${limit}`);
};

export const getScormInfo = async (id: number) => {
	return await myFetch(`${ENDPOINT_URL}/scorms/${id}`);
};
