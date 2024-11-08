import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormSchema } from "./schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/auth/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = (
		data
	) => {
		setIsLoading(true);
		login({ user: data.username, pass: data.password })
			.then(() => {})
			.catch((err) => {
				form.setError("root", {
					type: "manual",
					message: err.message,
				});
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
			<div className="bg-neutral-100 p-4 mt-36 rounded-lg shadow-md w-1/5 mx-auto animate-in fade-in slide-in-from-top-12 duration-500">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit, () =>
							console.log("error")
						)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Usuario</FormLabel>
									<FormControl>
										<Input
											autoFocus
											placeholder="Usuario"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Contraseña"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{form.formState.errors.root && (
							<FormMessage>
								{form.formState.errors.root.message}
							</FormMessage>
						)}

						<Button type="submit">
							{isLoading && <Loader2 className="animate-spin" />}{" "}
							Iniciar Sesión
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};
