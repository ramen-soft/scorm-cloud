import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { assignScorms, getAvailableScorms } from "../../api/customer";
import { CustomerScorm } from "../../dto/customer.dto";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/domain/shared/hooks/usePagination";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

type FormStep = "scorm_select" | "config";

interface AddContentFormProps {
	customerId: number;
	onChange?: () => void;
	children: React.ReactNode;
}

const formSchema = z.object({
	slots: z.coerce
		.number({
			required_error: "Requerido",
			invalid_type_error: "Debe ser un valor numérico.",
		})
		.min(1, "Se debe asignar al menos una licencia."),
	duration: z.coerce.number().min(1, "La duración debe ser mayor de un día."),
});

export const AddContentForm = ({
	customerId,
	onChange,
	children,
}: AddContentFormProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<FormStep>("scorm_select");
	const [availableScorms, setAvailableScorms] = useState<
		PaginatedResult<CustomerScorm>
	>({ results: [], page: 0, total: 0, totalPages: 0, count: 0 });

	const [selectedScorms, setSelectedScorms] = useState<CustomerScorm[]>([]);

	const pagination = usePagination({ noParams: true });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slots: 1,
			duration: 65535,
		},
	});

	useEffect(() => {
		getAvailableScorms({
			customerId,
			page: pagination.page,
			limit: 15,
		}).then((scorms) => {
			setAvailableScorms(scorms);
			pagination.setTotalPages(scorms.totalPages);
		});
	}, [open, customerId, pagination.page]);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setSelectedScorms([]);
			setStep("scorm_select");
			form.reset();
		}
		setOpen(open);
	};

	const handleClose = () => {
		form.reset();
		setSelectedScorms([]);
		setStep("scorm_select");
		setOpen(false);
	};

	const handleSelectScorm = (scorm: CustomerScorm) => {
		setSelectedScorms((ss) => [...ss, scorm]);
	};

	const handleRemoveScorm = (scorm: CustomerScorm) => {
		setSelectedScorms((ss) => ss.filter((s) => s.id != scorm.id));
	};

	const onSubmit = () => {
		const values = form.getValues();
		const scorms = selectedScorms.map((s) => s.id);
		assignScorms({ customerId, data: { values, scorms } })
			.then(() => {
				onChange?.();
				handleClose();
			})
			.catch((e) => {
				console.error(e);
			});
		//console.log({ values, scorms: selectedScorms.map((s) => s.id) });
	};

	return (
		<Dialog modal open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				className="max-w-fit"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Asignar contenidos al cliente</DialogTitle>
					<DialogDescription>
						Seleccione los contenidos que quiere poner a
						disponibilidad del cliente.
					</DialogDescription>
				</DialogHeader>

				{step == "scorm_select" && (
					<>
						<Pagination
							{...availableScorms}
							prevDisabled={pagination.prevDisabled}
							nextDisabled={pagination.nextDisabled}
							onPrevious={() => pagination.prev()}
							onNext={() => pagination.next()}
						/>

						<div className="grid grid-cols-2 space-x-2 max-h-[250px]">
							<div className="available flex flex-col items-start justify-stretch overflow-y-auto text-xs border rounded-sm">
								<div className="w-full">
									{availableScorms?.results
										.filter(
											(scorm) =>
												!selectedScorms.includes(scorm)
										)
										.map((result) => (
											<div
												onClick={() =>
													handleSelectScorm(result)
												}
												className="flex items-center cursor-pointer space-x-2 p-2 first:border-none border-t hover:bg-gray-200"
												key={result.id}
											>
												<span className="flex-grow">
													{result.name}
												</span>
												<ChevronRight className="flex-grow-0" />
											</div>
										))}
								</div>
							</div>

							<div className="selected flex flex-col items-start justify-stretch overflow-y-auto text-xs border rounded-sm">
								<div className="w-full">
									{selectedScorms?.map((result) => (
										<div
											onClick={() =>
												handleRemoveScorm(result)
											}
											className="flex items-center cursor-pointer space-x-2 p-2 first:border-none border-t hover:bg-gray-200"
											key={result.id}
										>
											<span className="flex-grow">
												{result.id} - {result.name}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<DialogFooter className="mt-4">
							<Button
								type="reset"
								onClick={handleClose}
								variant="ghost"
							>
								Cancelar
							</Button>
							<span className="flex-1"></span>
							<Button
								type="button"
								disabled={selectedScorms.length < 1}
								onClick={() => setStep("config")}
							>
								Siguiente
							</Button>
						</DialogFooter>
					</>
				)}

				{step == "config" && (
					<>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="slots"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nº Licencias</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="duration"
									render={({ field }) => (
										<FormItem className="mt-4">
											<FormLabel>
												Duración (días)
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
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
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											form.reset();
											setStep("scorm_select");
										}}
									>
										Anterior
									</Button>
									<Button type="submit">
										Asignar contenidos
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
