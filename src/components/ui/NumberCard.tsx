interface NumberCardProps {
	label: string;
	number: number;
}

export const NumberCard = ({ label, number }: NumberCardProps) => {
	return (
		<div className="rounded-lg shadow-md border flex flex-col flex-1">
			<h4 className="p-2 text-xl border-b">{label}</h4>
			<div className="flex items-center justify-center p-5">
				<div className="text-4xl flex rounded-full text-white items-center justify-center py-10 bg-blue-400 w-[100px] h-[100px]">
					{number}
				</div>
			</div>
		</div>
	);
};
