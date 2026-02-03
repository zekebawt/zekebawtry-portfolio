import { Navigation } from "@/components/navigation";
import { GradientBackground } from "@/components/gradient-background";
import { WaterCaustics } from "@/components/water-caustics";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Dashboard } from "@/components/sections/dashboard";
import { Interests } from "@/components/sections/interests";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  // Fetch blog posts at build time (server component)
  const posts = getAllPosts();
  
  // Take the most recent posts for the landing page
  const recentPosts = posts.slice(0, 3);

  return (
    <main className="relative min-h-screen bg-[#191D19]">
      {/* Water caustics WebGL shader - pool light refraction effect */}
      <WaterCaustics 
        intensity={0.55} // Balanced: visible but not overwhelming
        causticColor={[0.52, 0.65, 0.5]} // Sage green caustics
        causticColor2={[0.72, 0.53, 0.5]} // Warm rose accent for depth
      />
      {/* Keep the gradient background for additional depth */}
      <GradientBackground />
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Dashboard />
        <Interests />
        <Blog posts={recentPosts} />
        <Contact />
      </div>
    </main>
  );
}
