import { useParams } from "react-router-dom";
import { CustomerDashboard } from "@/domain/customer/components/detail/CustomerDashboard";

export const CustomerDetailPage = () => {
	const { id } = useParams();

	return (
		<>
			<CustomerDashboard customerId={Number(id)} />
		</>
	);
};
