import { AuthContext } from "@/auth/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
	return useContext(AuthContext);
};
