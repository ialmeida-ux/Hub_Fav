import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";
import CardImage, { type GameCardProps } from "../cards/CardImage";

const games: GameCardProps[] = [
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
                <CardImage key={game.id} game={game} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
