"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Clock, 
  CircleDollarSign,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const statusConfig = {
  shipped: {
    icon: CheckCircle2,
    color: "text-[#22c55e]",
    label: "SHIPPED",
  },
  active: {
    icon: Clock,
    color: "text-[#a3a3a3]",
    label: "IN PROGRESS",
  },
  pending: {
    icon: Clock,
    color: "text-[#737373]",
    label: "PENDING",
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-32 sm:py-40 relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header with stats inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            <span className="text-[10px] tracking-wide-caps text-[#22c55e] font-medium">
              BOUNTY HUNTING & PROJECTS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
              <span className="text-[#f5f5f5]">CODE THAT</span>
              <br />
              <span className="text-[#f5f5f5]/20">EARNS</span>
            </h2>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 lg:gap-12">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#22c55e] tracking-tight-hero">2</div>
              <div className="text-[10px] tracking-wide-caps text-[#a3a3a3]">MERGED</div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] tracking-tight-hero">2</div>
              <div className="text-[10px] tracking-wide-caps text-[#a3a3a3]">PENDING</div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] tracking-tight-hero">$0</div>
              <div className="text-[10px] tracking-wide-caps text-[#a3a3a3]">EARNED</div>
            </div>
          </div>
        </motion.div>

        {/* Projects - varied card sizes */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                className={isLarge ? "md:col-span-2" : ""}
              >
                <Link 
                  href={project.prUrl || "#"} 
                  target={project.prUrl ? "_blank" : undefined}
                  rel={project.prUrl ? "noopener noreferrer" : undefined}
                  className="block group"
                >
                  <div className={`bg-[#0a0a0b] p-8 sm:p-10 transition-all duration-500 hover:bg-[#111111] ${
                    isLarge ? 'lg:p-12' : ''
                  }`}>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`w-4 h-4 ${status.color}`} />
                        <span className={`text-[10px] tracking-wide-caps ${status.color}`}>
                          {status.label}
                        </span>
                        {project.type === "bounty" && (
                          <span className="text-[10px] tracking-wide-caps text-[#f5f5f5] bg-[#1a1a1a] px-2 py-1">
                            ${project.bounty}
                          </span>
                        )}
                      </div>
                      {project.prUrl && (
                        <ArrowUpRight className="w-5 h-5 text-[#a3a3a3] group-hover:text-[#22c55e] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-[#f5f5f5] group-hover:text-[#22c55e] transition-colors duration-300 mb-3 ${
                      isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}>
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] tracking-wide-caps text-[#a3a3a3] border border-[#262626] group-hover:border-[#22c55e]/30 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
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
            className="group flex items-center gap-3 text-[#a3a3a3] hover:text-[#22c55e] transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm tracking-wide-caps">VIEW ALL ON GITHUB</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
