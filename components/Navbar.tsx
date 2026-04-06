"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/Container";
import { ModeToggle } from "@/components/theme-toggle";
import { i18n } from "@/i18n/config";

type NavbarProps = {
  lang: string;
  siteName: string;
  converterLabel: string;
  trendingLabel: string;
  aboutLabel: string;
};

export function Navbar({
  lang,
  siteName,
  converterLabel,
  trendingLabel,
  aboutLabel,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "mobile-main-menu";

  const getLocalizedHref = (targetLocale: string) => {
    const currentPath = pathname || `/${lang}`;

    const segments = currentPath.split("/").filter(Boolean);
    if (segments.length > 0 && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number])) {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }

    return `/${targetLocale}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container
        as="nav"
        className="flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href={`/${lang}`} className="group inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-linear-to-br from-cyan-400 to-blue-500 text-lg font-bold text-slate-900">
            C
          </span>
          <span className="font-heading text-xl tracking-tight transition-colors group-hover:text-cyan-300">
            {siteName}
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full p-1.5 md:flex">
          <Link
            href={`/${lang}#converter`}
            className="rounded-full px-3 py-1 text-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {converterLabel}
          </Link>
          <Link
            href={`/${lang}#trending`}
            className="rounded-full px-3 py-1 text-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {trendingLabel}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="rounded-full px-3 py-1 text-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            {aboutLabel}
          </Link>
          <div className="mx-1 h-5 w-px bg-white/10" />
          {i18n.locales.map((localeCode) => (
            <Link
              key={localeCode}
              href={getLocalizedHref(localeCode)}
              className={`rounded-full px-2.5 py-1 text-base uppercase tracking-wide transition-colors ${
                localeCode === lang
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {localeCode}
            </Link>
          ))}
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/80 bg-background/70 text-foreground transition-colors hover:bg-accent/50"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen ? (
        <div
          id={mobileMenuId}
          className="border-t border-border/70 bg-background/95 backdrop-blur md:hidden"
        >
          <Container className="py-3">
            <div className="flex flex-col gap-1.5">
              <Link
                href={`/${lang}#converter`}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {converterLabel}
              </Link>
              <Link
                href={`/${lang}#trending`}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {trendingLabel}
              </Link>
              <Link
                href={`/${lang}/about`}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {aboutLabel}
              </Link>

              <div className="mt-1 flex items-center gap-2 px-1">
                {i18n.locales.map((localeCode) => (
                  <Link
                    key={localeCode}
                    href={getLocalizedHref(localeCode)}
                    onClick={closeMobileMenu}
                    className={`rounded-full px-3 py-1.5 text-sm uppercase tracking-wide transition-colors ${
                      localeCode === lang
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {localeCode}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
