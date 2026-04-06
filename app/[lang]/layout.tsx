import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n } from "@/i18n/config";
import { hasLocale } from "./dictionaries";
import { getSiteUrl } from "@/lib/seo";

const headingSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "KriptoUstası",
    template: "%s | KriptoUstası",
  },
  description: "Multilingual crypto ticker and converter platform.",
  applicationName: "KriptoUstası",
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { children, params } = props;
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html
      suppressHydrationWarning
      lang={lang}
      className={cn(
        "h-full",
        "antialiased",
        plexSans.variable,
        plexMono.variable,
        headingSerif.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
