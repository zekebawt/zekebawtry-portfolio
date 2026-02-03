"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Clock, 
  CircleDollarSign,
  Layers
} from "lucide-react";
import Link from "next/link";

const statusConfig = {
  shipped: {
    icon: CheckCircle2,
    color: "text-[#576953]",
    bg: "bg-[#576953]/10",
    border: "border-[#576953]/15",
    label: "Shipped",
  },
  active: {
    icon: Clock,
    color: "text-[#6a7d65]",
    bg: "bg-[#6a7d65]/10",
    border: "border-[#6a7d65]/15",
    label: "In Progress",
  },
  pending: {
    icon: Clock,
    color: "text-[#475647]",
    bg: "bg-[#475647]/10",
    border: "border-[#475647]/15",
    label: "Pending",
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 bg-[#121512]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#576953]/10 text-[#576953] text-xs font-medium mb-3">
            Bounty Hunting & Projects
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-3">
            Code That <span className="text-[#576953]">Earns</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto">
            Every PR merged is progress made. Every project shipped is a step toward mastery.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8"
        >
          {[
            { label: "PRs Merged", value: "2", icon: CheckCircle2 },
            { label: "Pending PRs", value: "2", icon: Clock },
            { label: "Bounty Earned", value: "$0", icon: CircleDollarSign },
            { label: "Active Projects", value: "2", icon: Layers },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.03 * index }}
            >
              <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 hover-lift">
                <CardContent className="p-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#576953]/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-3.5 h-3.5 text-[#576953]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-bold text-[#F1F7ED] truncate">{stat.value}</div>
                    <div className="text-[10px] text-[#6a7d65] truncate">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link 
                  href={project.prUrl || "#"} 
                  target={project.prUrl ? "_blank" : undefined}
                  rel={project.prUrl ? "noopener noreferrer" : undefined}
                  className="block group"
                >
                  <Card className="h-full bg-[#1f231f] border-[#262b26] hover:border-[#576953]/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-lg hover:shadow-[#576953]/10">
                    <CardHeader className="pb-2 px-4 pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                            <Badge 
                              variant="secondary" 
                              className={`${status.bg} ${status.border} ${status.color} border text-[10px] px-1.5 py-0`}
                            >
                              <StatusIcon className="w-2.5 h-2.5 mr-0.5" />
                              {status.label}
                            </Badge>
                            {project.type === "bounty" && (
                              <Badge variant="secondary" className="bg-[#CC8B86]/10 text-[#CC8B86] border-[#CC8B86]/15 border text-[10px] px-1.5 py-0">
                                <CircleDollarSign className="w-2.5 h-2.5 mr-0.5" />
                                ${project.bounty}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                            {project.name}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 pb-4">
                      <p className="text-[#8a9d86] mb-2.5 leading-relaxed text-xs line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-[10px] rounded bg-[#121512] text-[#6a7d65]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      {project.prUrl && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#576953] group-hover:gap-1.5 transition-all duration-300">
                          <Github className="w-3 h-3" />
                          View PR
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-[#262b26] hover:border-[#576953]/40 hover:bg-[#576953]/5 h-8 text-xs ripple transition-all duration-300"
          >
            <Link 
              href="https://github.com/zekebawt" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-3.5 h-3.5 mr-1.5" />
              View All Work on GitHub
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
