export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex md:items-center justify-center m pt-[10vh] md:pt-0 px-6  ">
      <div className="w-full max-w-6xl">{children}</div>
    </div>
  );
}
