import type { FavoriteTab } from "../common/types.ts";
import CardIcon from "./CardIcon";

export default function CardItem({ tab }: { tab: FavoriteTab }) {
  return <CardIcon tab={tab} />;
}
