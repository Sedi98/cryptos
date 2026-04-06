import Container from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/app-pages/home/sections/HeroSection";
import { CryptoDashboardSection } from "@/app-pages/home/sections/CryptoDashboardSection";
import type { HomePageProps } from "@/types/home";

export function HomePage({ lang, dict, initialCoins, initialRates }: HomePageProps) {
  return (
    <>
      <Navbar
        lang={lang}
        siteName={dict.siteName}
        converterLabel={dict.nav.converter}
        trendingLabel={dict.nav.trending}
        aboutLabel={dict.nav.about}
      />

      <main className="relative overflow-hidden pb-14" aria-labelledby="home-hero-title">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute top-56 -left-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <Container className="relative pt-12">
          <HeroSection
            lang={lang}
            title={dict.hero.title}
            description={dict.hero.description}
            trendingLabel={dict.nav.trending}
            converterLabel={dict.nav.converter}
          />
          <CryptoDashboardSection
            texts={dict.dashboard}
            initialCoins={initialCoins}
            initialRates={initialRates}
          />
        </Container>
      </main>
    </>
  );
}
