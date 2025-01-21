import { getScormInfo } from "@/domain/content/api/content";
import { ScormDetail } from "@/domain/content/dto/content.dto";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ScormDetailPage = () => {
	const { id } = useParams();

	const [data, setData] = useState<ScormDetail>();

	useEffect(() => {
		getScormInfo(Number(id)).then((result) => {
			setData(result);
		});
	}, [id]);

	return (
		<>
			{data && (
				<div className="p-4 bg-slate-50">
					<h1 className="text-4xl mb-4">{data.name}</h1>

					<div className="p-4 pt-2 border rounded-lg space-y-2 w-1/2">
						<h3 className="text-xl">Recursos</h3>
						{data.items.map((item) => (
							<div
								key={item.guid}
								className="bg-zinc-200 rounded-md p-2 flex justify-start flex-col"
							>
								<strong>{item.name}</strong>
								<small>{item.resource.href}</small>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};
