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
    <section id="skills" className="py-32 sm:py-40 bg-[#050505] relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header - full width, left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-[10px] tracking-wide-caps text-[#22c55e] font-medium">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#f5f5f5]">SKILLS THAT</span>
            <br />
            <span className="text-[#22c55e]">DELIVER</span>
          </h2>
        </motion.div>

        {/* Skills - horizontal scroll on mobile, grid on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {categories.map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              className="group"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs tracking-wide-caps text-[#a3a3a3] font-medium">
                  {category.toUpperCase()}
                </span>
                <div className="flex-1 h-px bg-[#1a1a1a]" />
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                    className="group/skill"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#f5f5f5] font-medium text-sm group-hover/skill:text-[#22c55e] transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-[#22c55e] text-xs font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-1 bg-[#1a1a1a] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + 0.05 * skillIndex, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#22c55e] to-[#4ade80]"
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
          className="mt-20 pt-8 border-t border-[#1a1a1a]"
        >
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#22c55e] tracking-tight-hero">
                2/day
              </div>
              <div className="text-xs tracking-wide-caps text-[#a3a3a3] mt-1">
                NEW SKILLS
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] tracking-tight-hero">
                14/week
              </div>
              <div className="text-xs tracking-wide-caps text-[#a3a3a3] mt-1">
                TARGET
              </div>
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-[#a3a3a3] text-sm max-w-md">
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
          backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </section>
  );
}
