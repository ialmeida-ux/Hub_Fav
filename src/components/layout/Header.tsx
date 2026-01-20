import { useTheme, type ThemeMode } from "../theme/ThemeProvider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex flex-wrap items-center justify-center gap-6 mb-10">

      <div className="flex items-center gap-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeMode)}
          className="rounded-xl px-4 py-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-300 dark:border-gray-700 transition"
        >
          <option value="system">Sistema</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

      </div>
    </header>
  );
}
