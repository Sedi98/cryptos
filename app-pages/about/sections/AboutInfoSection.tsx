import { AboutInfoSectionProps } from "@/types/about";


export function AboutInfoSection({
  title,
  description,
  points,
  tone = "default",
}: AboutInfoSectionProps) {
  const headingId = `about-${title.toLowerCase().replace(/[^a-z0-9а-яёəğışöüç]+/gi, "-")}`;

  return (
    <section className="mt-10 text-card-foreground" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className={`font-heading text-3xl leading-tight tracking-tight ${
          tone === "accent" ? "text-primary" : ""
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-3 max-w-4xl text-lg text-muted-foreground">{description}</p>
      ) : null}

      {points?.length ? (
        <ul className="mt-4 space-y-3 text-lg text-muted-foreground">
          {points.map((item, index) => (
            <li key={`${index}-${item}`} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
