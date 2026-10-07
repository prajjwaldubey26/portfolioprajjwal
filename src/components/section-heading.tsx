export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  highlight,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  highlight: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-text">
        {`// ${index} — ${eyebrow}`}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
      >
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
    </div>
  );
}
