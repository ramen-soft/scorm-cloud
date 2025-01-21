import { ENDPOINT_URL } from "@/consts";

export const getScorms = async ({
	page = 0,
	limit = 15,
}: {
	page: number;
	limit: number;
}) => {
	const req = await fetch(
		`${ENDPOINT_URL}/scorms?page=${page}&limit=${limit}`
	);
	return req.json();
};

export const getScormInfo = async (id: number) => {
	const req = await fetch(`${ENDPOINT_URL}/scorms/${id}`);
	return req.json();
};
