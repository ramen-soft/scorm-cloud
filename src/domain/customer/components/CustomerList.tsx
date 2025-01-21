import { Link } from "react-router-dom";
import { CustomerListItem } from "../dto/customer.dto";
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
import { EditCustomerForm } from "./dialogs/EditCustomerForm";
import { Badge } from "@/components/ui/badge";

export const CustomerList = ({
	customers,
	onUpdate,
}: {
	customers: PaginatedResult<CustomerListItem>;
	onUpdate?: () => void;
}) => {
	return (
		<>
			<TooltipProvider delayDuration={100}>
				<div className="flex items-center space-x-2 justify-end mb-4">
					<EditCustomerForm onChange={() => onUpdate?.()}>
						<Button>Agregar cliente</Button>
					</EditCustomerForm>
				</div>

				<Table className="border">
					<TableHeader className="bold">
						<TableRow>
							<TableHead></TableHead>
							<TableHead>CIF</TableHead>
							<TableHead>Razón social</TableHead>
							<TableHead>Orígenes permitidos</TableHead>
							<TableHead>Activo</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.results.length > 0 ? (
							customers.results.map((customer) => (
								<TableRow key={customer.guid}>
									<TableCell className="w-10">
										<div className="flex justify-center">
											<Button variant="outline" asChild>
												<Link
													to={`/customers/${customer.id}`}
												>
													<SearchIcon />
												</Link>
											</Button>
										</div>
									</TableCell>
									<TableCell>{customer.cif}</TableCell>
									<TableCell>{customer.name}</TableCell>
									<TableCell>
										<div className="space-x-1">
											{customer.origins.map(
												(origin, i) => (
													<Badge key={i}>
														{origin}
													</Badge>
												)
											)}
										</div>
									</TableCell>
									<TableCell>
										{customer.active ? "Sí" : "No"}
									</TableCell>
									<TableCell className="space-x-2">
										<EditCustomerForm
											onChange={() => onUpdate?.()}
											customer={customer}
										>
											<Button
												className="rounded-full w-10 h-10 [&_svg]:size-4"
												variant="default"
											>
												<Pencil />
											</Button>
										</EditCustomerForm>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center text-lg text-gray-500"
								>
									No hay registros de clientes.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TooltipProvider>
		</>
	);
};
