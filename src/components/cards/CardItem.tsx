import type { FavoriteTab } from "./types.ts";
import { useTheme } from "../theme/ThemeProvider";

export default function CardItem({ tab }: { tab: FavoriteTab }) {
  const { accentColor } = useTheme();
  const isClean = tab.variant === 'clean';

  return (
    <a
      href={tab.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative h-44 rounded-3xl 
        bg-white/60 dark:bg-gray-500/15
        backdrop-blur-xl p-6
        flex flex-col justify-center
        shadow-lg transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl text-center
      "
    >
      <div className="flex justify-center w-full">
        <div className={isClean ? "w-52 h-32" : "w-20 h-20"}>
          {tab.iconDark ? (
            <>
              <img className="dark:hidden w-full h-full object-contain" src={tab.icon} alt="" />
              <img className="hidden dark:block w-full h-full object-contain" src={tab.iconDark} alt="" />
            </>
          ) : (
            <img
              className="w-full h-full object-contain dark:invert dark:brightness-0 dark:contrast-200"
              src={tab.icon}
              alt=""
            />
          )}
        </div>
      </div>
      {!isClean && (
        <>
          <span className="text-2xl font-bold" style={{ color: accentColor }}>
            {tab.title}
          </span>
          <span className="mt-2 text-gray-600 dark:text-gray-400">
            {tab.description}
          </span>
        </>
      )}
    </a>
  );
}
