import { Link } from "react-router-dom";
import { ScormListItem } from "../dto/content.dto";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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

export const ScormList = ({
	scorms,
}: {
	scorms: PaginatedResult<ScormListItem>;
}) => {
	return (
		<>
			<TooltipProvider delayDuration={100}>
				<Table className="border">
					<TableHeader className="bold">
						<TableRow>
							<TableHead></TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>Activo</TableHead>
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
									<TableCell>{scorm.name}</TableCell>
									<TableCell>
										{scorm.status ? "Sí" : "No"}
									</TableCell>
									<TableCell className="space-x-2">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													className="rounded-full w-10 h-10 [&_svg]:size-4"
													variant="default"
												>
													<Pencil />
												</Button>
											</TooltipTrigger>
											<TooltipContent className="bg-zinc-600">
												Editar SCORM
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
