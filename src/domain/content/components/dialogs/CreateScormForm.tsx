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
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import JSZip from "jszip";
import { ENDPOINT_URL } from "@/consts";
import { SpinnerCircularFixed } from "spinners-react";
import { XMLParser } from "fast-xml-parser";
import { IManifest, ManifestStructure } from "../ManifestStructure";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { myFetch } from "@/hooks/useFetch";

interface CreateScormFormProps {
	onChange?: () => void;
	children: React.ReactNode;
	data?: { id: number | null; price: number; ean: string | null };
}

const formSchema = z
	.object({
		id: z.number().readonly().nullable(),
		file: z
			.instanceof(File, {
				message: "Debe seleccionar un fichero SCORM válido.",
			})
			.optional(),
		price: z
			.number({ message: "El precio debe ser numérico." })
			.nonnegative({ message: "No se permiten precios negativos" })
			.multipleOf(0.01),
		ean: z.string().nullable(),
	})
	.refine(
		(data) => {
			if (!data.id) {
				return data.file instanceof File;
			}
			return true;
		},
		{ message: "Debe seleccionar un fichero SCORM válido.", path: ["file"] }
	);

const alwaysArray = [
	"manifest.organizations",
	"manifest.organizations.organization.item",
	"manifest.resources",
];

const parser = new XMLParser({
	isArray: (_, jPath) => {
		return alwaysArray.indexOf(jPath) !== -1;
	},
});

export const CreateScormForm = ({
	children,
	data,
	onChange,
}: CreateScormFormProps) => {
	const [open, setOpen] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	const [parsedManifest, setParsedManifest] = useState<{
		manifest: IManifest;
	}>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: data || {
			id: null,
			file: undefined,
			price: 0,
			ean: null,
		},
	});

	useEffect(() => {
		if (open) {
			form.reset(data || form.formState.defaultValues);
		}
	}, [open, data, form]);

	const onSubmit = () => {
		const values = form.getValues();
		const fd = new FormData();
		if (values.id) fd.append("id", values.id.toString());
		fd.append("price", values.price.toString());
		if (values.ean) {
			fd.append("ean", values.ean);
		}
		let req;
		if (values.file instanceof File) {
			setIsUploading(true);
			fd.append("scorm", values.file);
			req = myFetch(`${ENDPOINT_URL}/scorms/upload`, {
				method: "post",
				body: fd,
			})
				.then((data) => {
					if (data.status == "ok" && data.id) {
						navigate(`/scorms/${data.id}`);
					}
				})
				.catch((err) => {
					form.reset(form.formState.defaultValues);
					setError(err.message);
				});
		} else {
			req = myFetch(`${ENDPOINT_URL}/scorms/update`, {
				method: "post",
				body: fd,
			}).then(() => {
				onChange?.();
				handleClose();
			});
		}
		req.catch((err) => setError(err.message)).finally(() =>
			setIsUploading(false)
		);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setParsedManifest(undefined);
			form.reset();
		}
		setOpen(open);
	};

	const handleClose = () => {
		form.reset();
		setParsedManifest(undefined);
		setOpen(false);
	};

	const readZipFile = (file: File) => {
		const zipReader = new JSZip();
		zipReader.loadAsync(file).then((zip) => {
			const manifest = zip.files["imsmanifest.xml"];
			if (manifest) {
				manifest.async("text").then((content) => {
					const parsed = parser.parse(content);
					setParsedManifest(parsed);
				});
			}
		});
	};

	return (
		<Dialog modal open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent onInteractOutside={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Agregar nuevo contenido</DialogTitle>
					<DialogDescription>
						En este cuadro de diálogo puedes crear nuevos contenidos
						que estarán disponibles para asociar a clientes.
					</DialogDescription>
				</DialogHeader>

				{error && (
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error al cargar SCORM</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{isUploading && (
					<div className="flex flex-col items-center justify-center">
						<SpinnerCircularFixed color="#059" size="96" />
						<em className="text-gray-500 font-normal mt-2">
							Cargando SCORM...
						</em>
					</div>
				)}

				{!isUploading && (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							{!data && (
								<FormItem>
									<FormLabel>Paquete SCORM</FormLabel>
									<FormControl>
										<Input
											type="file"
											placeholder="Paquete SCORM"
											accept="application/zip"
											onChange={(event) => {
												if (event.target.files) {
													if (
														event.target.files
															.length > 0
													) {
														readZipFile(
															event.target
																.files?.[0]
														);
													}
													form.setValue(
														"file",
														event.target.files?.[0],
														{
															shouldValidate:
																true,
														}
													);
												}
											}}
										/>
									</FormControl>
									<FormMessage />
									{form.formState.errors.file && (
										<p className="text-red-500">
											{form.formState.errors.file.message}
										</p>
									)}
								</FormItem>
							)}

							<FormItem>
								<div className="flex items-end space-x-2 mt-3">
									<FormLabel>EAN</FormLabel>
									<FormDescription>
										Un identificador para este contenido
									</FormDescription>
								</div>
								<FormControl>
									<Input
										value={form.watch("ean") ?? ""}
										onChange={(event) => {
											if (
												event.target.value.trim()
													.length > 0
											) {
												form.setValue(
													"ean",
													event.target.value.trim()
												);
											} else {
												form.setValue("ean", null);
											}
										}}
									/>
								</FormControl>
							</FormItem>

							<FormItem className="mt-2">
								<FormLabel>Precio</FormLabel>
								<FormControl>
									<Input
										value={form.watch("price") ?? ""}
										onChange={(event) => {
											console.log(event.target.value);
											form.setValue(
												"price",
												Number(event.target.value),
												{ shouldValidate: true }
											);
										}}
									/>
								</FormControl>
								{form.formState.errors.price && (
									<p className="text-red-500">
										{form.formState.errors.price.message}
									</p>
								)}
							</FormItem>

							{parsedManifest && (
								<ManifestStructure
									data={parsedManifest.manifest}
								/>
							)}

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
									disabled={!form.formState.isValid}
									type="submit"
								>
									Guardar cambios
								</Button>
							</DialogFooter>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
};
