import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerDetail, CustomerListItem } from "../../dto/customer.dto";
import { getCustomer, saveCustomer } from "../../api/customer";
import { isValidCIF, isValidNIF } from "@/lib/validators";
import { Switch } from "@/components/ui/switch";
import { MinusIcon, PlusIcon } from "lucide-react";

interface EditCustomerFormProps {
	customer?: CustomerListItem;
	onChange?: () => void;
	children: React.ReactNode;
}

const formSchema = z.object({
	id: z.number().readonly().nullable(),
	cif: z
		.string({ required_error: "Requerido" })
		.refine((value) => isValidNIF(value) || isValidCIF(value), {
			message: "No es un CIF o un NIF válido.",
		}),
	nombre: z
		.string({ required_error: "Requerido" })
		.min(2, "El nombre debe tener al menos 2 caracteres."),
	origenes: z.array(z.string()),
	activo: z.boolean().default(true),
});

export const EditCustomerForm: React.FC<EditCustomerFormProps> = ({
	customer,
	children,
	onChange,
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: null,
			cif: "",
			nombre: "",
			origenes: [""],
			activo: true,
		},
	});

	useEffect(() => {
		if (open) {
			if (customer && customer.id) {
				getCustomer(customer.id).then((data) => {
					if (data) {
						form.reset({
							id: data.id,
							nombre: data.name,
							cif: data.cif,
							origenes: data.origins,
							activo: data.active,
						});
					}
				});
			} else {
				form.reset(form.formState.defaultValues);
			}
		}
	}, [open, customer, form]);

	const onSubmit = () => {
		const values = form.getValues();
		const customer: Partial<CustomerDetail> = {
			id: values.id!,
			name: values.nombre,
			cif: values.cif,
			active: values.activo,
			origins: values.origenes,
		};
		saveCustomer(customer).then((result) => {
			if (result) {
				setOpen(false);
				onChange?.();
			}
		});
	};

	const handleAddOrigin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.setValue("origenes", [...form.getValues().origenes, ...[""]]);
	};

	const handleRemoveOrigin = (
		e: MouseEvent<HTMLButtonElement>,
		originIndex: number
	) => {
		e.preventDefault();
		e.stopPropagation();
		const newOrigins = [...form.getValues().origenes];
		newOrigins.splice(originIndex, 1);
		form.setValue("origenes", newOrigins);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			form.reset();
		}
		setOpen(open);
	};

	const handleClose = () => {
		form.reset();
		setOpen(false);
	};

	return (
		<Dialog modal open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent onInteractOutside={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>
						{customer ? "Editar cliente" : "Agregar cliente"}
					</DialogTitle>
					<DialogDescription>
						{customer
							? "Aqui puedes editar la información del cliente"
							: "Crea un nuevo cliente"}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="cif"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CIF</FormLabel>
									<FormControl>
										<Input placeholder="CIF" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="nombre"
							render={({ field }) => (
								<FormItem className="mt-4">
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input
											placeholder="Nombre"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="origenes"
							render={({ field }) => (
								<FormItem className="mt-4">
									<div className="flex items-center justify-between space-x-2 mb-6">
										<FormLabel htmlFor="origenes_0">
											Orígenes permitidos
										</FormLabel>
										<button
											onClick={handleAddOrigin}
											className="bg-slate-600 leading-none flex items-center justify-center font-semibold rounded-full w-[26px] h-[26px] text-white"
										>
											<PlusIcon />
										</button>
									</div>
									{form.getValues().origenes.map((_, i) => (
										<FormControl key={`origin_${i}`}>
											<div className="flex items-center space-x-2">
												<Input
													placeholder="Nombre"
													id={`origenes_${i}`}
													name={`origenes[${i}]`}
													onChange={(e) => {
														const {
															target: { value },
														} = e;
														const updatedArray = [
															...field.value,
														];
														updatedArray[i] = value;

														form.setValue(
															"origenes",
															updatedArray
														);
													}}
													onBlur={field.onBlur}
													value={field.value[i]}
													ref={field.ref}
												/>
												<button
													className="bg-red-600 aspect-square leading-none flex items-center justify-center font-semibold rounded-full w-[26px] h-[26px] text-white"
													onClick={(e) =>
														handleRemoveOrigin(e, i)
													}
												>
													<MinusIcon />
												</button>
											</div>
										</FormControl>
									))}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="activo"
							render={({ field }) => (
								<FormItem>
									<div className="mt-4 flex items-center space-x-2">
										<FormLabel>Activo</FormLabel>
										<FormControl>
											<Switch
												name={field.name}
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</div>
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-4">
							<Button
								type="reset"
								onClick={handleClose}
								variant="ghost"
							>
								Cancelar
							</Button>
							<span className="flex-1"></span>
							<Button variant="destructive">Eliminar</Button>
							<Button type="submit">Guardar cambios</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
