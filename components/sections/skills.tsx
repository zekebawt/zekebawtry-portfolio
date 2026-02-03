"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { 
  Code2, 
  Palette, 
  Database, 
  Globe, 
  Cpu, 
  Terminal,
  Layers,
  Workflow
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: Palette,
  Backend: Database,
  APIs: Globe,
  "AI/ML": Cpu,
  Tools: Terminal,
  DevOps: Workflow,
};

const categoryColors: Record<string, string> = {
  Languages: "from-blue-500 to-cyan-500",
  Frontend: "from-purple-500 to-pink-500",
  Backend: "from-green-500 to-emerald-500",
  APIs: "from-orange-500 to-bronze",
  "AI/ML": "from-violet-500 to-purple-500",
  Tools: "from-slate-400 to-slate-300",
  DevOps: "from-red-500 to-orange-500",
};

export function Skills() {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-24 sm:py-32 bg-shadow-grey/50">
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
            Technical Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Skills That <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Every skill here represents value I can create for teams and projects. 
            I'm not just learning — I'm building capabilities that translate directly to impact.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const Icon = categoryIcons[category] || Layers;
            const gradient = categoryColors[category] || "from-bronze to-bronze-light";
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              >
                <Card className="h-full bg-ebony/50 border-ebony overflow-hidden">
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100">{category}</h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-slate-300 font-medium">{skill.name}</span>
                            <span className="text-bronze text-sm font-semibold">{skill.level}%</span>
                          </div>
                          <div className="relative h-2 bg-ebony rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 + 0.05 * skillIndex }}
                              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Acquisition Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-bronze/10 via-bronze/5 to-transparent border-bronze/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Continuous Learning
                  </h3>
                  <p className="text-slate-400">
                    I learn 2 new skills every day as part of my growth system. 
                    Track my progress in real-time.
                  </p>
                </div>
                <div className="flex gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gradient">2/day</div>
                    <div className="text-sm text-slate-500">New Skills</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gradient">14/week</div>
                    <div className="text-sm text-slate-500">Target</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
