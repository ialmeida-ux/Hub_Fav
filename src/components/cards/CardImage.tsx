import { Link } from "react-router-dom";
import CardThumb from "./CardThumb";

export interface GameCardProps {
	id: string;
	title: string;
	url: string;
	image: string;
}

export default function CardImage({ game }: { game: GameCardProps }) {
	return (
		<Link
			to={game.url}
			className="group relative h-64 rounded-3xl bg-white/60 dark:bg-gray-500/15 backdrop-blur-xl flex flex-col justify-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
		>
			<div className="absolute inset-0 rounded-3xl overflow-hidden">
				<CardThumb src={game.image} alt={game.title} />
			</div>
		</Link>
	);
}
