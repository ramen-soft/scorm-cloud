import { CustomerStats } from "./CustomerStats";
import { useParams } from "react-router-dom";

export const CustomerDashboard = () => {
	const params = useParams();
	const customerId = Number(params.id);
	return <CustomerStats customerId={customerId} />;
};
