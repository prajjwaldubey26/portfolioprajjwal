import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Slot } from "@/components/slot";

export function Education() {
  const education = portfolio.education;

  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading id="education-title" index="05" eyebrow="EDUCATION" title="Academic" highlight="snapshot" />
      <article className="glass mt-8 rounded-2xl p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          <Slot value={education.degree} />
        </h3>
        <p className="mt-3 text-muted">
          <Slot value={education.college} />
        </p>
        <p className="mt-2 font-mono text-xs text-muted">
          <Slot value={education.location} />
          <span className="mx-2" aria-hidden>
            ·
          </span>
          <Slot value={education.graduation} />
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <li key={course} className="rounded-full border border-line px-3 py-1 text-sm">
              {course}
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
}
