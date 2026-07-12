export interface VideoCardProps {
	id: string;
	title: string;
	active: boolean;
	onSelect: (id: string) => void;
}

export default function CardPlayer({ id, title, active, onSelect }: VideoCardProps) {
	return (
		<button
			type="button"
			onClick={() => onSelect(id)}
			className={`cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105 ${
				active ? "ring-4 ring-blue-500" : ""
			}`}
		>
			<div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
				<img
					src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
					alt={title}
					className="absolute top-0 left-0 w-full h-full object-cover"
				/>
			</div>
		</button>
	);
}
