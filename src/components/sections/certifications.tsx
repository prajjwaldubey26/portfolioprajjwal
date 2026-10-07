import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Slot } from "@/components/slot";

export function Certifications() {
  const cert = portfolio.certification;

  return (
    <Section id="certifications" labelledBy="certifications-title">
      <SectionHeading
        id="certifications-title"
        index="06"
        eyebrow="CERTIFICATIONS"
        title="Credential"
        highlight="roadmap"
      />
      <article className="mt-8 grid gap-6 rounded-2xl border border-dashed border-line bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <div
          className="grid h-28 w-24 place-items-center rounded-b-[2rem] rounded-t-2xl border border-dashed border-[#FF9900]/70 bg-[#FF9900]/10 font-display text-lg font-semibold text-accent-text"
          aria-hidden
        >
          AWS
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">{cert.statusLabel}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">
            <Slot value={cert.name} />
          </h3>
          <p className="mt-2 text-sm text-muted">{cert.detail}</p>
        </div>
      </article>
    </Section>
  );
}
