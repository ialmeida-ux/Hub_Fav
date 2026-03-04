import BackgroundBlur from "../../layout/BackgroundBlur";
import Container from "../../layout/Container";
import Potions from "../../../assets/games/Terraria_potions_PC_1.4.0.webp";

interface TerrariaLink {
  id: string;
  title: string;
  url: string;
  preview: string;
  description?: string;
}

const terrariaLinks: TerrariaLink[] = [
  {
    id: "1",
    title: "Terraria Potions",
    url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/cd/Terraria_potions_PC_1.4.0.png/revision/latest/scale-to-width-down/1000?cb=20210303095755",
    preview: Potions,
    description: "Guia visual de todas as poções do Terraria",
  },
];

export default function TerrariaPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <BackgroundBlur />
      <Container>
        <div className="mt-25 desktop:mt-0 max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
            Terraria
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terrariaLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={link.preview}
                    alt={link.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {link.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    {link.url}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
