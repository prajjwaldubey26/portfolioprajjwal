import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Project } from "@/components/sections/project";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Project />
      <Journey />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
