import { Link } from "react-router-dom";
import { ScormListItem } from "../dto/content.dto";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import { Button } from "@/components/ui/button";
import { Pencil, SearchIcon } from "lucide-react";
import { CreateScormForm } from "./dialogs/CreateScormForm";

export const ScormList = ({
	scorms,
	onChange,
}: {
	scorms: PaginatedResult<ScormListItem>;
	onChange: () => void;
}) => {
	return (
		<>
			<TooltipProvider delayDuration={100}>
				<div className="flex items-center space-x-2 justify-end mb-4">
					<CreateScormForm onChange={() => onChange?.()}>
						<Button>Agregar contenido</Button>
					</CreateScormForm>
				</div>

				<Table className="border">
					<TableHeader className="bold">
						<TableRow>
							<TableHead></TableHead>
							<TableHead>EAN</TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>Precio</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{scorms.results.length > 0 ? (
							scorms.results.map((scorm) => (
								<TableRow key={scorm.guid}>
									<TableCell className="w-10">
										<div className="flex justify-center">
											<Button variant="outline" asChild>
												<Link
													to={`/scorms/${scorm.id}`}
												>
													<SearchIcon />
												</Link>
											</Button>
										</div>
									</TableCell>
									<TableCell>{scorm.ean || "-"}</TableCell>
									<TableCell>{scorm.name}</TableCell>
									<TableCell>
										{scorm.price.toLocaleString("es-ES", {
											style: "currency",
											currency: "EUR",
											useGrouping: true,
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
										})}
									</TableCell>
									<TableCell className="space-x-2">
										<CreateScormForm
											data={scorm}
											onChange={() => onChange?.()}
										>
											<Button
												className="rounded-full w-10 h-10 [&_svg]:size-4"
												variant="default"
											>
												<Pencil />
											</Button>
										</CreateScormForm>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-lg text-gray-500"
								>
									No hay SCORM registrados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TooltipProvider>
		</>
	);
};
