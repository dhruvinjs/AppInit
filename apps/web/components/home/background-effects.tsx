export function BackgroundEffects({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className={`absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[140px] transition-colors duration-700 ${
          isDark ? "bg-blue-600/10" : "bg-amber-300/25"
        }`}
      />
      <div
        className={`absolute -right-[10%] -bottom-[10%] h-[50%] w-[50%] rounded-full blur-[140px] transition-colors duration-700 ${
          isDark ? "bg-blue-900/10" : "bg-indigo-300/25"
        }`}
      />
      <div
        className={`absolute inset-0 bg-size-[24px_24px] transition-colors duration-700 ${
          isDark
            ? "bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] opacity-[0.03]"
            : "bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] opacity-[0.04]"
        }`}
      />
    </div>
  );
}
