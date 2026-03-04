import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";
import CardsGrid from "../cards/CardsGrid";
import type { FavoriteTab } from "../cards/types.ts";
import chatgptIcon from "../../assets/ChatGPT-Logo.svg";
import claudeLightIcon from "../../assets/Claude-Light-Logo.png";
import claudeDarkIcon from "../../assets/Claude-Dark-Logo.png";
import deepseekIcon from "../../assets/DeepSeek-Logo.png";
import geminiIcon from "../../assets/GoogleGemini-Logo.png";
import googleStitchLightIcon from "../../assets/GoogleStitch-Light-Logo.svg";
import googleStitchDarkIcon from "../../assets/GoogleStitch-Dark-Logo.svg";
import liveloIcon from "../../assets/Livelo-Logo.svg";
import tactiqLightIcon from "../../assets/Tactiq-Light-Logo.svg";
import tactiqDarkIcon from "../../assets/Tactiq-Dark-Logo.svg";
import boltIcon from "../../assets/Bolt-Logo.svg";
import base44Icon from "../../assets/Base44-Logo.png";

const tabs: FavoriteTab[] = [
  {
    icon: chatgptIcon,
    link: "https://chat.openai.com",
    variant: 'clean'
  },
  {
    icon: claudeLightIcon,
    iconDark: claudeDarkIcon,
    link: "https://claude.ai",
    variant: 'clean'
  },
  {
    icon: deepseekIcon,
    iconDark: deepseekIcon,
    link: "https://chat.deepseek.com",
    variant: 'clean'
  },
  {
    icon: geminiIcon,
    iconDark: geminiIcon,
    link: "https://gemini.google.com",
    variant: 'clean'
  },
  {
    icon: googleStitchLightIcon,
    iconDark: googleStitchDarkIcon,
    link: "https://stitch.withgoogle.com/",
    variant: 'clean',
  },
  {
    icon: liveloIcon,
    iconDark: liveloIcon,
    link: "https://www.livelo.com.br/juntar-pontos/todos-os-parceiros",
    variant: 'clean'
  },
  {
    icon: tactiqLightIcon,
    iconDark: tactiqDarkIcon,
    link: "https://app.tactiq.io/",
    variant: 'clean'
  },
  {
    icon: boltIcon,
    link: "https://bolt.new/",
    variant: 'clean'
  },
  {
    icon: base44Icon,
    iconDark: base44Icon,
    link: "https://base44.com/",
    variant: 'clean'
  },
];

export default function FavoriteTabsPage() {
  return (
    <div className="relative min-h-screen mt-25 xl:mt-0 bg-gray-100 dark:bg-gray-900 transition-colors duration-700 ">
      <BackgroundBlur />
      <Container>
        <CardsGrid tabs={tabs} />
      </Container>
    </div>
  );
}
