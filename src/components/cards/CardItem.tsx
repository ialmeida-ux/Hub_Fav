import type { FavoriteTab } from "./types.ts";
import CardIcon from "./CardIcon";

export default function CardItem({ tab }: { tab: FavoriteTab }) {
  return <CardIcon tab={tab} />;
}
