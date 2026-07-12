export interface PinnedLinkCardProps {
	id: string;
	title: string;
	url: string;
	preview: string;
	description?: string;
}

export default function CardClean({ link }: { link: PinnedLinkCardProps }) {
	return (
		<a
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-4"
		>
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
					<img src={link.preview} alt={link.title} className="w-6 h-6 object-contain" />
				</div>

				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
						{link.title}
					</h3>
					{link.description && (
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{link.description}</p>
					)}
					<p className="text-xs text-gray-500 dark:text-gray-500 truncate">{link.url}</p>
				</div>
			</div>
		</a>
	);
}
