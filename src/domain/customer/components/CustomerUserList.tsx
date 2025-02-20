import { PaginatedResult } from "@/domain/shared/dto/paginated.dto";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CustomerUser } from "../dto/customer.dto";

export const CustomerUserList = ({
	users,
}: {
	users: PaginatedResult<CustomerUser>;
}) => {
	return (
		<>
			<Table className="border">
				<TableHeader className="bold">
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Usuario</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.results.length > 0 ? (
						users.results.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.full_name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.username}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={5}
								className="text-center text-lg text-gray-500"
							>
								No hay usuarios registrados para este cliente.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};
