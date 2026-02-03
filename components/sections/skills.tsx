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
  Languages: "from-[#76b04f] to-[#91c072]",
  Frontend: "from-[#91c072] to-[#add095]",
  Backend: "from-[#5e8d3f] to-[#76b04f]",
  APIs: "from-[#76b04f] to-[#5e8d3f]",
  "AI/ML": "from-[#b4524b] to-[#c3756f]",
  Tools: "from-[#91a58d] to-[#c8d2c6]",
  DevOps: "from-[#c3756f] to-[#b4524b]",
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
    <section id="skills" className="py-24 sm:py-32 bg-[#111311]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#76b04f]/10 text-[#76b04f] text-sm font-medium mb-4">
            Technical Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f4f1] mb-6">
            Skills That <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-lg text-[#91a58d] max-w-3xl mx-auto">
            Every skill here represents value I can create for teams and projects. 
            I'm not just learning — I'm building capabilities that translate directly to impact.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const Icon = categoryIcons[category] || Layers;
            const gradient = categoryColors[category] || "from-[#76b04f] to-[#91c072]";
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              >
                <Card className="h-full bg-[#181d16]/50 border-[#475643] overflow-hidden">
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#f1f4f1]">{category}</h3>
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
                            <span className="text-[#c8d2c6] font-medium">{skill.name}</span>
                            <span className="text-[#76b04f] text-sm font-semibold">{skill.level}%</span>
                          </div>
                          <div className="relative h-2 bg-[#2f372f] rounded-full overflow-hidden">
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
          <Card className="bg-gradient-to-r from-[#76b04f]/10 via-[#76b04f]/5 to-transparent border-[#76b04f]/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#f1f4f1] mb-2">
                    Continuous Learning
                  </h3>
                  <p className="text-[#91a58d]">
                    I learn 2 new skills every day as part of my growth system. 
                    Track my progress in real-time.
                  </p>
                </div>
                <div className="flex gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gradient">2/day</div>
                    <div className="text-sm text-[#768f70]">New Skills</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gradient">14/week</div>
                    <div className="text-sm text-[#768f70]">Target</div>
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
