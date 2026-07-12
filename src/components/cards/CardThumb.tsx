export interface CardThumbProps {
	src: string;
	alt: string;
}

export default function CardThumb({ src, alt }: CardThumbProps) {
	return <img className="w-full h-full object-cover" src={src} alt={alt} />;
}
