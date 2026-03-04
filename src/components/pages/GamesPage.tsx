import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";
import { Link } from "react-router-dom";

interface Game {
  id: string;
  title: string;
  url: string;
  image: string;
}

const games: Game[] = [
  {
    id: "1",
    title: "Terraria",
    url: "/jogos/terraria",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1769844435",
  },
  {
    id: "2",
    title: "Stardew Valley",
    url: "/jogos/stardew-valley",
    image: "https://t2.tudocdn.net/554748?w=646&h=284",
  },
];

export default function GamesPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <BackgroundBlur />
      <Container>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {games.map((game) => (
                <Link
                  key={game.id}
                  to={game.url}
                  className="
                    group relative h-64 rounded-3xl 
                    bg-white/60 dark:bg-gray-500/15
                    backdrop-blur-xl
                    flex flex-col justify-center
                    shadow-lg transition-all duration-500
                    hover:-translate-y-2 hover:shadow-2xl
                    overflow-hidden
                  "
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={game.image}
                      alt={game.title}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
