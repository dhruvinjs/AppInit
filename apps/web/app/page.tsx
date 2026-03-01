"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

import { BackgroundEffects } from "@/components/home/background-effects";
import { FlagsSection } from "@/components/home/flags-section";
import { Footer } from "@/components/home/footer";
import { GettingStartedSection } from "@/components/home/getting-started-section";
import { HeroSection } from "@/components/home/hero-section";
import { Navbar } from "@/components/home/navbar";
import { StacksSection } from "@/components/home/stacks-section";

export default function Home() {
  const command = "npx @dhruvinjs/appinit my-test-app";
  const [isCopied, setIsCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-700 selection:bg-blue-500/30 selection:text-white ${
        isDark ? "bg-black text-zinc-300" : "bg-stone-50 text-stone-700"
      }`}
    >
      <BackgroundEffects isDark={isDark} />
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
        onScrollToSection={scrollToSection}
        docsHref="/docs"
        docsLabel="Docs"
      />
      <HeroSection
        isDark={isDark}
        command={command}
        isCopied={isCopied}
        onCopy={handleCopy}
        docsHref="/docs"
      />
      <GettingStartedSection isDark={isDark} />
      <StacksSection isDark={isDark} />
      <FlagsSection isDark={isDark} />
      <Footer isDark={isDark} docsHref="/docs" />
    </main>
  );
}
