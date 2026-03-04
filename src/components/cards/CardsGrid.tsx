import CardItem from "./CardItem";
import type { FavoriteTab } from "./types.ts";

export default function CardsGrid({ tabs }: { tabs: FavoriteTab[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 desktop:gap-8 mt-25 desktop:mt-0">
      {tabs.map((tab, index) => (
        <CardItem key={index} tab={tab} />
      ))}
    </div>
  );
}
