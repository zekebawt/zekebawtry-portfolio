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
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    label: "Shipped",
  },
  active: {
    icon: Clock,
    color: "text-bronze",
    bg: "bg-bronze/10",
    border: "border-bronze/20",
    label: "In Progress",
  },
  pending: {
    icon: Clock,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    label: "Pending",
  },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-shadow-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-bronze/10 text-bronze text-sm font-medium mb-4">
            Bounty Hunting & Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Code That <span className="text-gradient">Earns</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Every PR merged is progress made. Every project shipped is a step toward 
            mastery. Here&apos;s what I&apos;ve built and what I&apos;m building.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "PRs Merged", value: "2", icon: CheckCircle2 },
            { label: "Pending PRs", value: "2", icon: Clock },
            { label: "Bounty Earned", value: "$0", icon: CircleDollarSign },
            { label: "Active Projects", value: "2", icon: Layers },
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-ebony/50 border-ebony">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-bronze/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full bg-ebony/50 border-ebony hover:border-bronze/30 transition-all group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`${status.bg} ${status.border} ${status.color} border`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          {project.type === "bounty" && (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 border">
                              <CircleDollarSign className="w-3 h-3 mr-1" />
                              ${project.bounty}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-bronze transition-colors">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-ebony text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    {project.prUrl && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-ebony-light hover:border-bronze/50 hover:bg-bronze/5"
                        >
                          <Link href={project.prUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View PR
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-ebony-light hover:border-bronze/50 hover:bg-bronze/5"
          >
            <Link 
              href="https://github.com/zekebawt" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View All Work on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
