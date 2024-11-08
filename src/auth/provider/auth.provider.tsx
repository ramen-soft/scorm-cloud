import { ENDPOINT_URL } from "@/consts";
import { AuthContext } from "../context/authContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PropsWithChildren, useMemo } from "react";

export type AuthLoginDTO = {
	user: string;
	pass: string;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useLocalStorage("user", null);

	const login = async (loginDto: AuthLoginDTO) => {
		setUser("test");
		return;
		const headers = new Headers();
		headers.set("Content-Type", "application/json");
		const req = await fetch(`${ENDPOINT_URL}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers,
			body: JSON.stringify(loginDto),
		});
		const res = await req.json();
		if (req.ok) {
			setUser(res.username);
		} else {
			setUser(null);
			throw new Error(res.message);
		}
	};

	const logout = () => {
		setUser(null);
	};

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		[user]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
