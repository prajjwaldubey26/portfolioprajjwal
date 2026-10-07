import { portfolio } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

export function personJsonLd() {
  const sameAs = [
    portfolio.person.github,
    portfolio.person.linkedin,
    portfolio.person.x,
  ].filter((url) => !isPlaceholder(url));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.person.name,
    jobTitle: "BE/IT Undergraduate",
    description: portfolio.hero.tagline,
    url: portfolio.siteUrl,
    sameAs,
    knowsAbout: [
      "Amazon Web Services",
      "Docker",
      "CI/CD",
      "Linux",
      "Java",
      "Spring Boot",
      "React",
    ],
  };

  if (!isPlaceholder(portfolio.person.email)) {
    data.email = portfolio.person.email;
  }

  if (!isPlaceholder(portfolio.person.city)) {
    data.homeLocation = { "@type": "Place", name: portfolio.person.city };
  }

  if (portfolio.person.photo) {
    data.image = new URL(portfolio.person.photo, portfolio.siteUrl).toString();
  }

  if (!isPlaceholder(portfolio.education.college)) {
    data.alumniOf = {
      "@type": "CollegeOrUniversity",
      name: portfolio.education.college,
    };
  }

  return data;
}
