import { useEffect, useState } from "react";
import { getCustomerStats } from "../../api/customer";
import { NumberCard } from "@/components/ui/NumberCard";

export const CustomerStats = ({ customerId }: { customerId: number }) => {
	const [stats, setStats] = useState<{
		scorms: number;
		users: number;
		subscriptions: number;
	} | null>(null);

	useEffect(() => {
		getCustomerStats(customerId).then((res) => setStats(res));
	}, [customerId]);

	return (
		<>
			{stats ? (
				<div className="flex justify-stretch space-x-4">
					<NumberCard label="Productos" number={stats.scorms} />
					<NumberCard label="Usuarios" number={stats.users} />
					<NumberCard
						label="Suscripciones"
						number={stats.subscriptions}
					/>
				</div>
			) : (
				<></>
			)}
		</>
	);
};
