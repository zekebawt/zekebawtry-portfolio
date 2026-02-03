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
  Languages: "from-[#576953] to-[#6a7d65]",
  Frontend: "from-[#6a7d65] to-[#8a9d86]",
  Backend: "from-[#475647] to-[#576953]",
  APIs: "from-[#576953] to-[#475647]",
  "AI/ML": "from-[#CC8B86] to-[#d9a39f]",
  Tools: "from-[#8a9d86] to-[#aab9a7]",
  DevOps: "from-[#d9a39f] to-[#CC8B86]",
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
    <section id="skills" className="py-16 sm:py-20 bg-[#121512]">
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
            Technical Arsenal
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-4">
            Skills That <span className="text-[#576953]">Deliver</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto">
            Every skill here represents value I can create. Not just learning — building capabilities that translate directly to impact.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const Icon = categoryIcons[category] || Layers;
            const gradient = categoryColors[category] || "from-[#576953] to-[#6a7d65]";
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * categoryIndex }}
              >
                <Card className="h-full bg-[#1f231f]/50 border-[#3a4438] overflow-hidden hover-lift hover-glow transition-all duration-300">
                  <CardContent className="p-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-[#F1F7ED]">{category}</h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.03 * skillIndex }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[#d0daca] font-medium text-sm">{skill.name}</span>
                            <span className="text-[#576953] text-xs font-semibold">{skill.level}%</span>
                          </div>
                          <div className="relative h-1.5 bg-[#262b26] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.1 + 0.03 * skillIndex }}
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
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-[#576953]/10 via-[#576953]/5 to-transparent border-[#576953]/20 hover-glow transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-[#F1F7ED] mb-1">
                    Continuous Learning
                  </h3>
                  <p className="text-[#8a9d86] text-sm">
                    I learn 2 new skills every day as part of my growth system.
                  </p>
                </div>
                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#576953]">2/day</div>
                    <div className="text-xs text-[#6a7d65]">New Skills</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#CC8B86]">14/week</div>
                    <div className="text-xs text-[#6a7d65]">Target</div>
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
