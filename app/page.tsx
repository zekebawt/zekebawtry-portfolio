import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Dashboard } from "@/components/sections/dashboard";
import { Interests } from "@/components/sections/interests";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191D19]">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Dashboard />
      <Interests />
      <Blog />
      <Contact />
    </main>
  );
}
