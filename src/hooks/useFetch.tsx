import { useEffect, useState } from "react";

export const myFetch = async (url: string, init?: RequestInit) => {
	try {
		if (!init) {
			init = {};
		}
		init.credentials = "include";
		const res = await fetch(url, init);
		const json = await res.json();
		if (!res.ok) {
			if (res.status == 403) {
				localStorage.removeItem("user");
				window.location.href = "/login";
			}
			throw new Error(json);
		}
		return json;
	} catch (e) {
		console.error(e);
	}
};

type FetchMethod = "get" | "post" | "put" | "delete" | "patch";
export const useFetch = (url: string, method: FetchMethod, body: unknown) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url, {
					method,
					body: body ? JSON.stringify(body) : undefined,
					credentials: "include",
				});
				const json = await res.json();
				if (!res.ok) {
					throw new Error(json);
				}
				setData(json);
			} catch (err) {
				setError((err as { message: string }).message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, body, method]);

	return { data, loading, error };
};
