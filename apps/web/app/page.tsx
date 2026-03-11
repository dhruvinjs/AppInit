"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

import { BackgroundEffects } from "@/components/home/background-effects";
import { BoilerplateExplorer } from "@/components/home/boilerplate-explorer";
import { FAQSection } from "@/components/home/faq-section";
import { FinalCTASection } from "@/components/home/final-cta-section";
import { FlagsSection } from "@/components/home/flags-section";
import { Footer } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { Navbar } from "@/components/home/navbar";
import { ProblemSection } from "@/components/home/problem-section";
import { ProofSection } from "@/components/home/proof-section";
import { SolutionSection } from "@/components/home/solution-section";
import { StacksSection } from "@/components/home/stacks-section";
import { TrustSignalsSection } from "@/components/home/trust-signals-section";

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
      {/* Section 1: Hero */}
      <HeroSection
        isDark={isDark}
        command={command}
        isCopied={isCopied}
        onCopy={handleCopy}
        docsHref="/docs"
      />
      {/* Section 2: Problem */}
      <ProblemSection isDark={isDark} />
      {/* Section 3: Solution */}
      <SolutionSection isDark={isDark} />
      {/* Section 4: Proof */}
      <ProofSection isDark={isDark} />
      {/* Section 5: What You Get */}
      <StacksSection isDark={isDark} />
      {/* Section 6: Customization */}
      <FlagsSection isDark={isDark} />
      {/* Section 7: Boilerplate Explorer */}
      <BoilerplateExplorer isDark={isDark} />
      {/* Section 8: FAQ */}
      <FAQSection isDark={isDark} />
      {/* Section 9: Trust Signals */}
      <TrustSignalsSection isDark={isDark} />
      {/* Section 10: Final CTA */}
      <FinalCTASection
        isDark={isDark}
        command={command}
        isCopied={isCopied}
        onCopy={handleCopy}
      />
      <Footer isDark={isDark} docsHref="/docs" />
    </main>
  );
}
