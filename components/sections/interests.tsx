"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  GitBranch, 
  Palette, 
  Workflow, 
  Bot,
  Sparkles,
  ArrowRight
} from "lucide-react";

const interests = [
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI/ML",
    description: "Building intelligent systems and exploring the frontiers of machine learning",
    color: "from-[#CC8B86] to-[#d9a39f]",
    tags: ["LLMs", "Agents", "RAG"],
  },
  {
    slug: "open-source",
    icon: GitBranch,
    title: "Open Source",
    description: "Contributing to projects that matter and building in public",
    color: "from-[#576953] to-[#6a7d65]",
    tags: ["PRs", "Community", "Collaboration"],
  },
  {
    slug: "design-systems",
    icon: Palette,
    title: "Design Systems",
    description: "Crafting consistent, scalable component libraries and visual languages",
    color: "from-[#6a7d65] to-[#8a9d86]",
    tags: ["Components", "Tokens", "DX"],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "Automation",
    description: "Eliminating repetitive tasks and building self-sustaining workflows",
    color: "from-[#8a9d86] to-[#aab9a7]",
    tags: ["CI/CD", "Scripts", "Tools"],
  },
  {
    slug: "agent-ecosystems",
    icon: Bot,
    title: "Agent Ecosystems",
    description: "Designing multi-agent systems that collaborate and evolve together",
    color: "from-[#d9a39f] to-[#CC8B86]",
    tags: ["MAS", "Orchestration", "Memory"],
  },
];

export function Interests() {
  return (
    <section id="interests" className="py-16 sm:py-20 bg-[#191D19]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#CC8B86]/10 text-[#CC8B86] text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3 inline mr-1" />
            What Excites Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-3">
            Interests & <span className="text-[#CC8B86]">Beyond</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto">
            Beyond day-to-day work, these are the domains that fuel my curiosity and drive exploration.
          </p>
        </motion.div>

        {/* Interests Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.08 * index,
                ease: "easeOut"
              }}
              className={index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link href={`/interests/${interest.slug}`}>
                <Card className="h-full bg-[#1f231f] border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 group overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-[#576953]/10 cursor-pointer">
                  <CardContent className="p-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${interest.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <interest.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base font-semibold text-[#F1F7ED] mb-1 group-hover:text-[#576953] transition-colors duration-300 flex items-center justify-between">
                      {interest.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[#8a9d86] text-xs leading-relaxed mb-3">
                      {interest.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {interest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-[10px] rounded bg-[#121512] text-[#6a7d65] border border-[#262b26] group-hover:border-[#576953]/30 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-[#CC8B86]/8 via-[#576953]/5 to-transparent border-[#CC8B86]/15 inline-block hover-glow transition-all duration-300">
            <CardContent className="p-4">
              <p className="text-[#d0daca] text-xs">
                <span className="text-[#CC8B86] font-medium">Always learning.</span> These interests shape how I approach problems and build solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
