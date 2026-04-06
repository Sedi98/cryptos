import Container from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { AboutHeroSection } from "@/app-pages/about/sections/AboutHeroSection";
import { AboutInfoSection } from "@/app-pages/about/sections/AboutInfoSection";
import { AboutPageProps } from "@/types/about";



export function AboutPage({ lang, dict }: AboutPageProps) {
  return (
    <>
      <Navbar
        lang={lang}
        siteName={dict.siteName}
        converterLabel={dict.nav.converter}
        trendingLabel={dict.nav.trending}
        aboutLabel={dict.nav.about}
      />

      <main className="relative overflow-hidden pb-14" aria-labelledby="about-page-title">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-52 -left-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <Container className="relative py-12">
          <AboutHeroSection
            title={dict.about.title}
            description={dict.about.description}
          />

          <AboutInfoSection
            title={dict.aboutPage.missionTitle}
            description={dict.aboutPage.missionText}
           
          />

          <AboutInfoSection
            title={dict.aboutPage.highlightsTitle}
            points={dict.aboutPage.highlights}
          />

          <AboutInfoSection
            title={dict.aboutPage.dataTitle}
            description={dict.aboutPage.dataText}
          />
        </Container>
      </main>
    </>
  );
}
