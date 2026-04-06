import Image from "next/image";
import heroImage from "@/public/images/hero-img.webp";
import { Button } from "@/components/ui/button";
import type { HeroSectionProps } from "@/types/home";

export function HeroSection({ title, description, converterLabel, lang }: HeroSectionProps) {
  return (
    <header className="py-4 sm:py-6" aria-labelledby="home-hero-title">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1
            id="home-hero-title"
            className="max-w-3xl font-heading text-3xl leading-tight tracking-tight sm:text-5xl"
          >
            {title}
          </h1>

          <p className=" max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="default"
              className="h-11 rounded-full border-0  px-6 text-base font-semibold  shadow-[0_8px_30px_-8px_rgba(6,182,212,0.55)] transition-all hover:border-0 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-400"
            >
              <a href={`/${lang}#converter`}>{converterLabel}</a>
            </Button>
          </div>
           
         
        </div>

        <Image
          src={heroImage}
          alt="Hero"
          width={400}
          height={400}
          sizes="(max-width: 767px) 0px, (max-width: 1279px) 45vw, 400px"
          fetchPriority="high"
          decoding="async"
          placeholder="empty"
          className="mx-auto hidden md:block h-[320px] w-[320px] lg:h-[360px] lg:w-[360px] xl:h-[400px] xl:w-[400px] object-contain"
        />
      </div>
    </header>
  );
}
