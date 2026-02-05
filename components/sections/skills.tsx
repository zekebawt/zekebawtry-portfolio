"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Vulnerability Assessment", category: "Security Research" },
  { name: "API Security", category: "Security Research" },
  { name: "Authentication Flows", category: "Security Research" },
  { name: "Infrastructure Testing", category: "Security Research" },
  { name: "Python", category: "Languages & Tools" },
  { name: "TypeScript", category: "Languages & Tools" },
  { name: "Burp Suite", category: "Languages & Tools" },
  { name: "Git/GitHub", category: "Languages & Tools" },
  { name: "LLM Security", category: "AI/ML Systems" },
  { name: "ML Pipeline Analysis", category: "AI/ML Systems" },
  { name: "Training Infrastructure", category: "AI/ML Systems" },
  { name: "Model Deployment", category: "AI/ML Systems" },
  { name: "React/Next.js", category: "Development" },
  { name: "Node.js", category: "Development" },
  { name: "Cloud Infrastructure", category: "Development" },
  { name: "Automation", category: "Development" },
];

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
            CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#F1F7ED]">TECHNICAL</span>
            <br />
            <span className="text-[#576953]">FOCUS</span>
          </h2>
        </motion.div>

        {/* Skills - grid layout */}
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

              {/* Skills list - clean, no percentages */}
              <div className="space-y-3">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.05 * skillIndex }}
                    className="group/skill"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#576953] opacity-60 group-hover/skill:opacity-100 transition-opacity duration-300" />
                      <span className="text-[#F1F7ED] font-medium text-sm group-hover/skill:text-[#576953] transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note - no stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-[#3a4438]"
        >
          <p className="text-[#8a9d86] text-sm max-w-xl">
            <span className="text-[#576953]">Continuous learning isn&apos;t optional.</span>{" "}
            The security landscape evolves daily.
          </p>
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
