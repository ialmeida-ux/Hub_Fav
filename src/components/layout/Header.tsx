import { useTheme, type ThemeMode } from "../theme/ThemeProvider";
import { Sun, Moon, Monitor, Settings } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import { NavLink } from "react-router"

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-5 h-5" />;
      case "dark":
        return <Moon className="w-5 h-5" />;
      case "system":
        return <Monitor className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const cycleTheme = () => {
    const themes: ThemeMode[] = ["system", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-4 px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Favoritos
          </NavLink>
          <NavLink
            to="/youtube"
            className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            YouTube
          </NavLink>
          <NavLink
            to="/fixados"
            className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Fixados
          </NavLink>
          <NavLink
            to="/jogos"
            className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Jogos
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

        {/* Theme Toggle */}
        <button
          onClick={cycleTheme}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          title={`Tema: ${theme === "system" ? "Sistema" : theme === "light" ? "Claro" : "Escuro"}`}
        >
          {getThemeIcon()}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          title="Configurações"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
}

