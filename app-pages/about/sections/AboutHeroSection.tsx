import type { AboutHeroSectionProps } from "@/types/about";


export function AboutHeroSection({
  
  title,
  description,
  
}: AboutHeroSectionProps) {
  return (
    <section className="py-2 text-card-foreground text-center mx-auto" aria-labelledby="about-page-title">
      <h1
        id="about-page-title"
        className="max-w-4xl mx-auto font-heading text-5xl leading-tight tracking-tight sm:text-6xl"
      >
        {title}
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
        {description}
      </p>

    


    </section>
  );
}
