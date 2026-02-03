"use client";

import { motion } from "framer-motion";
import { projects, dashboardData } from "@/lib/data";
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
    color: "text-[#576953]",
    label: "SHIPPED",
  },
  active: {
    icon: Clock,
    color: "text-[#8a9d86]",
    label: "IN PROGRESS",
  },
  pending: {
    icon: Clock,
    color: "text-[#3a4438]",
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
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              BOUNTY HUNTING & PROJECTS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
              <span className="text-[#F1F7ED]">CODE THAT</span>
              <br />
              <span className="text-[#F1F7ED]/20">EARNS</span>
            </h2>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 lg:gap-12">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#576953] tracking-tight-hero">{dashboardData.income.pendingPRs}</div>
              <div className="text-[10px] tracking-wide-caps text-[#8a9d86]">PENDING</div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#F1F7ED] tracking-tight-hero">${dashboardData.income.pendingAmount}</div>
              <div className="text-[10px] tracking-wide-caps text-[#8a9d86]">POTENTIAL</div>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-[#F1F7ED] tracking-tight-hero">${dashboardData.income.totalEarned}</div>
              <div className="text-[10px] tracking-wide-caps text-[#8a9d86]">EARNED</div>
            </div>
          </div>
        </motion.div>

        {/* Projects - varied card sizes */}
        <div className="grid md:grid-cols-2 gap-0">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className={isLarge ? "md:col-span-2" : ""}
              >
                <Link 
                  href={project.prUrl || "#"} 
                  target={project.prUrl ? "_blank" : undefined}
                  rel={project.prUrl ? "noopener noreferrer" : undefined}
                  className="block group"
                >
                  <div className={`bg-[#191D19] border border-[#3a4438] p-8 sm:p-10 transition-all duration-500 hover:bg-[#262b26] ${
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
                          <span className="text-[10px] tracking-wide-caps text-[#F1F7ED] bg-[#262b26] px-2 py-1">
                            ${project.bounty}
                          </span>
                        )}
                      </div>
                      {project.prUrl && (
                        <ArrowUpRight className="w-5 h-5 text-[#8a9d86] group-hover:text-[#576953] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 mb-3 ${
                      isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
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
                          className="px-3 py-1 text-[10px] tracking-wide-caps text-[#8a9d86] border border-[#3a4438] group-hover:border-[#576953]/30 transition-colors duration-300"
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
            className="group flex items-center gap-3 text-[#8a9d86] hover:text-[#576953] transition-colors duration-300"
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
