/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { AuthLoginDTO } from "../provider/auth.provider";

export const AuthContext = createContext({
	user: null,
	login: (data: AuthLoginDTO): Promise<unknown> => {
		return new Promise((resolve, reject) => reject());
	},
	logout: () => {},
});
