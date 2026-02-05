"use client";

import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Activity, 
  ArrowUpRight,
  Shield,
  Code2
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "Infrastructure Security Research",
    description: "Ongoing vulnerability research in AI/ML systems and cloud infrastructure. Focus on authentication, API security, and data pipeline integrity.",
    status: "active",
    icon: Shield,
    tags: ["AI/ML", "Infrastructure", "Security"],
  },
  {
    id: 2,
    name: "Open Source Security",
    description: "Security-focused contributions to open source projects. Responsible disclosure and collaborative fixes.",
    status: "ongoing",
    icon: Code2,
    tags: ["Python", "Security", "OSS"],
  },
];

const statusConfig = {
  active: {
    color: "text-[#576953]",
    label: "ACTIVE",
  },
  ongoing: {
    color: "text-[#8a9d86]",
    label: "ONGOING",
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-32 sm:py-40 relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
            RESEARCH
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#F1F7ED]">SELECT</span>
            <br />
            <span className="text-[#F1F7ED]/20">WORK</span>
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-0">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <div className={`bg-[#191D19] border border-[#3a4438] p-8 sm:p-10 transition-all duration-500 hover:bg-[#262b26] ${
                  index === 0 ? 'lg:p-12' : ''
                }`}>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-[10px] tracking-wide-caps ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <Activity className="w-4 h-4 text-[#3a4438]" />
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-[#F1F7ED] mb-3 ${
                    index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}>
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#8a9d86] text-sm leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-wide-caps text-[#8a9d86] border border-[#3a4438]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link 
            href="https://github.com/zekebawt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-[#8a9d86] hover:text-[#576953] transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm tracking-wide-caps">VIEW ON GITHUB</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
