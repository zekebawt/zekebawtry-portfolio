"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Brain, 
  GitBranch, 
  Palette, 
  Workflow, 
  Bot,
  ArrowUpRight
} from "lucide-react";

const interests = [
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI/ML",
    description: "Building intelligent systems and exploring the frontiers of machine learning",
    tags: ["LLMs", "Agents", "RAG"],
  },
  {
    slug: "open-source",
    icon: GitBranch,
    title: "Open Source",
    description: "Contributing to projects that matter and building in public",
    tags: ["PRs", "Community"],
  },
  {
    slug: "design-systems",
    icon: Palette,
    title: "Design Systems",
    description: "Crafting consistent, scalable component libraries",
    tags: ["Components", "DX"],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "Automation",
    description: "Eliminating repetitive tasks and building workflows",
    tags: ["CI/CD", "Tools"],
  },
  {
    slug: "agent-ecosystems",
    icon: Bot,
    title: "Agent Ecosystems",
    description: "Designing multi-agent systems that evolve together",
    tags: ["MAS", "Memory"],
  },
];

export function Interests() {
  return (
    <section id="interests" className="py-32 sm:py-40 bg-[#191D19] relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header - asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-8 mb-16"
        >
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              WHAT EXCITES ME
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
              <span className="text-[#F1F7ED]">INTERESTS</span>
              <br />
              <span className="text-[#F1F7ED]/20">&amp; BEYOND</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:flex lg:items-end">
            <p className="text-[#8a9d86] text-lg max-w-xl">
              Beyond day-to-day work, these are the domains that fuel my curiosity and drive exploration.
            </p>
          </div>
        </motion.div>

        {/* Interests - masonry-ish layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link 
                href={`/interests/${interest.slug}`}
                className="block h-full group"
              >
                <div className="h-full bg-[#191D19] border border-[#3a4438] p-6 sm:p-8 hover:bg-[#262b26] hover:border-[#576953]/20 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#262b26] flex items-center justify-center mb-6 group-hover:bg-[#576953]/10 transition-colors duration-300">
                    <interest.icon className="w-5 h-5 text-[#8a9d86] group-hover:text-[#576953] transition-colors duration-300" />
                  </div>
                  
                  {/* Title with arrow */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                      {interest.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#8a9d86] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#8a9d86] text-sm leading-relaxed mb-6">
                    {interest.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {interest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] tracking-wide-caps text-[#8a9d86] border border-[#3a4438] group-hover:border-[#576953]/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#8a9d86]">
            <span className="text-[#576953]">Always learning.</span>{" "}
            These interests shape how I approach problems and build solutions.
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#576953]/20 to-transparent" />
    </section>
  );
}
