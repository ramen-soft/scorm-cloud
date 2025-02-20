import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CloudCog, Trash2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomerScorm } from "../dto/customer.dto";
import { ENDPOINT_URL } from "@/consts";

export const CustomerScormList = ({
	customerId,
	scorms,
}: {
	customerId: number;
	scorms: PaginatedResult<CustomerScorm>;
}) => {
	return (
		<>
			<TooltipProvider delayDuration={100}>
				<Table className="border">
					<TableHeader className="bold">
						<TableRow>
							<TableHead>Producto</TableHead>
							<TableHead>Licencias Disponibles</TableHead>
							<TableHead>Duración Licencia</TableHead>
							<TableHead>Fecha asignación</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{scorms.results.length > 0 ? (
							scorms.results.map((scorm) => (
								<TableRow key={scorm.guid}>
									<TableCell>{scorm.name}</TableCell>
									<TableCell>{scorm.slots}</TableCell>
									<TableCell>{scorm.duration}</TableCell>
									<TableCell>
										{scorm.created_on.toString()}
									</TableCell>
									<TableCell className="space-x-2">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													asChild
													className="rounded-full w-10 h-10 [&_svg]:size-6"
													variant="default"
												>
													<a
														href={`${ENDPOINT_URL}/scorms/${scorm.id}/connector?customer=${customerId}`}
													>
														<CloudCog />
													</a>
												</Button>
											</TooltipTrigger>
											<TooltipContent className="bg-zinc-600">
												Descargar conector
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													className="rounded-full w-10 h-10 [&_svg]:size-6"
													variant="destructive"
												>
													<Trash2 />
												</Button>
											</TooltipTrigger>
											<TooltipContent className="bg-zinc-600">
												Eliminar suscripción
											</TooltipContent>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-lg text-gray-500"
								>
									No hay SCORM asociados a este cliente
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TooltipProvider>
		</>
	);
};
