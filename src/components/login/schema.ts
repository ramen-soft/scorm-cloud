import { z } from "zod";
export const LoginFormSchema = z.object({
	username: z.string().min(1, { message: "Requerido" }),
	password: z
		.string()
		.min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
