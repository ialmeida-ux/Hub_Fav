export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">{children}</div>
    </div>
  );
}
