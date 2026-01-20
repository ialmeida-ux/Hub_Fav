import { useTheme } from "../theme/ThemeProvider";

export default function BackgroundBlur() {
  const { accentColor } = useTheme();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-[-20%] left-[-10%] w-125 h-125 rounded-full blur-3xl opacity-40 animate-pulse"
        style={{ backgroundColor: accentColor }}
      />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-pink-500 blur-3xl opacity-30 animate-pulse" />
    </div>
  );
}
