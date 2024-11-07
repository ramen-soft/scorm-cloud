import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";

export type AuthenticationGuardProps = {
	children?: React.ReactElement;
	redirectPath?: string;
	guardType?: "authenticated" | "unauthenticated";
};

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
	redirectPath = "/login",
	guardType = "authenticated",
	...props
}) => {
	const { user } = useAuth();
	const isAllowed = guardType === "authenticated" ? !!user : !user;

	return (
		<ProtectedRoute
			redirectPath={redirectPath}
			isAllowed={isAllowed}
			{...props}
		/>
	);
};
