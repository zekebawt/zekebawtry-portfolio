"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function Skills() {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categories = Object.entries(groupedSkills);

  return (
    <section id="skills" className="py-32 sm:py-40 bg-[#191D19] relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header - full width, left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#F1F7ED]">SKILLS THAT</span>
            <br />
            <span className="text-[#576953]">DELIVER</span>
          </h2>
        </motion.div>

        {/* Skills - horizontal scroll on mobile, grid on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {categories.map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              className="group"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs tracking-wide-caps text-[#8a9d86] font-medium">
                  {category.toUpperCase()}
                </span>
                <div className="flex-1 h-px bg-[#3a4438]" />
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.05 * skillIndex }}
                    className="group/skill"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#F1F7ED] font-medium text-sm group-hover/skill:text-[#576953] transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-[#576953] text-xs font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-1 bg-[#3a4438] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + 0.05 * skillIndex, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#576953] to-[#8a9d86]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-[#3a4438]"
        >
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#576953] tracking-tight-hero">
                2/day
              </div>
              <div className="text-xs tracking-wide-caps text-[#8a9d86] mt-1">
                NEW SKILLS
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#F1F7ED] tracking-tight-hero">
                14/week
              </div>
              <div className="text-xs tracking-wide-caps text-[#8a9d86] mt-1">
                TARGET
              </div>
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-[#8a9d86] text-sm max-w-md">
                Continuous learning isn&apos;t optional. It&apos;s the foundation of everything I build.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#576953 1px, transparent 1px), linear-gradient(90deg, #576953 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </section>
  );
}
