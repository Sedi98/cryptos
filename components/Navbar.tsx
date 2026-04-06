"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const getLocalizedHref = (targetLocale: string) => {
    const currentPath = pathname || `/${lang}`;

    const segments = currentPath.split("/").filter(Boolean);
    if (segments.length > 0 && i18n.locales.includes(segments[0] as (typeof i18n.locales)[number])) {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }

    return `/${targetLocale}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`;
  };

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

        <div className="flex items-center gap-2 rounded-full    p-1.5">
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
      </Container>
    </header>
  );
}
