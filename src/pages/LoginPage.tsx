import { useAuth } from "@/auth/hooks/useAuth";

export const LoginPage = () => {
	const { login } = useAuth();

	return (
		<>
			<div>LoginPage</div>
			<button onClick={() => login({ user: "pepe", pass: "pon" })}>
				Login
			</button>
		</>
	);
};
