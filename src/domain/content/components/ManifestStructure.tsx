export interface IManifest {
	metadata: {
		"adlcp:location": string;
		schema: string;
		schemaVersion: number;
	};
	organizations: {
		organization: {
			item: {
				title: string;
				"adlcp:masteryscore"?: number;
			}[];
			title: string;
		};
	}[];
}

export const ManifestStructure = ({ data }: { data: IManifest }) => {
	console.log(data);
	return (
		<div>
			<h2 className="text-2xl border-b pb-1 mb-2 mt-4">Contenido</h2>
			<div className="max-h-[250px] overflow-y-auto">
				{data.organizations.map(({ organization: org }, oi) => (
					<div key={oi} className="organization">
						<h3 className="text-xl mb-2">{org.title}</h3>
						<ul className="list-disc list-inside text-sm">
							{org.item.map((item, i) => (
								<li key={i}>{item.title}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
