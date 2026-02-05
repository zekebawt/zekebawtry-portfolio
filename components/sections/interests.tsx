"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Brain, 
  Cloud, 
  Lock, 
  Workflow, 
  Server,
  ArrowUpRight
} from "lucide-react";

const interests = [
  {
    slug: "ai-ml-security",
    icon: Brain,
    title: "AI/ML Security",
    description: "Exploring vulnerabilities in machine learning systems, from training pipelines to inference APIs.",
    tags: ["LLMs", "Model Security", "Data Poisoning"],
  },
  {
    slug: "cloud-infrastructure",
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Understanding the attack surface of modern cloud deployments and container orchestration.",
    tags: ["AWS", "K8s", "IAM"],
  },
  {
    slug: "authentication",
    icon: Lock,
    title: "Authentication & Identity",
    description: "Deep dives into auth flows, token security, and identity management systems.",
    tags: ["OAuth", "JWT", "SSO"],
  },
  {
    slug: "api-security",
    icon: Server,
    title: "API Security",
    description: "REST, GraphQL, gRPC — different protocols, consistent methodology.",
    tags: ["REST", "GraphQL", "Rate Limiting"],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "Automation & Tooling",
    description: "Building tools that make security research more effective.",
    tags: ["Python", "Scripting", "CI/CD"],
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
              RESEARCH INTERESTS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
              <span className="text-[#F1F7ED]">AREAS OF</span>
              <br />
              <span className="text-[#F1F7ED]/20">FOCUS</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:flex lg:items-end">
            <p className="text-[#8a9d86] text-lg max-w-xl">
              The domains that shape my approach to security research and drive deeper exploration.
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
              <div className="block h-full group">
                <div className="h-full bg-[#191D19] border border-[#3a4438] p-6 sm:p-8 hover:bg-[#262b26] hover:border-[#576953]/20 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#262b26] flex items-center justify-center mb-6 group-hover:bg-[#576953]/10 transition-colors duration-300">
                    <interest.icon className="w-5 h-5 text-[#8a9d86] group-hover:text-[#576953] transition-colors duration-300" />
                  </div>
                  
                  {/* Title */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                      {interest.title}
                    </h3>
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
              </div>
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
            <span className="text-[#576953]">Curiosity-driven.</span>{" "}
            These interests shape how I approach security research.
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#576953]/20 to-transparent" />
    </section>
  );
}
