"use client";

import { motion } from "framer-motion";
import { Target, Brain, Code2, Shield, Rocket, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "One real vulnerability beats a hundred false positives.",
  },
  {
    icon: Brain,
    title: "Deep Understanding",
    description: "Know the system before you test the system.",
  },
  {
    icon: Code2,
    title: "Continuous Learning",
    description: "The landscape changes daily. So do I.",
  },
  {
    icon: Shield,
    title: "Responsible Disclosure",
    description: "Security research with integrity. Always.",
  },
  {
    icon: Rocket,
    title: "Technical Depth",
    description: "Infrastructure, APIs, auth flows, data pipelines.",
  },
  {
    icon: Heart,
    title: "Selective Focus",
    description: "Fewer targets, deeper dives, better results.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left side - smaller, offset */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:pt-20"
          >
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              WHO I AM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight-hero mt-3 sm:mt-4 mb-4 sm:mb-6">
              <span className="text-[#F1F7ED]">THE</span>
              <br />
              <span className="text-[#F1F7ED]/20">APPROACH</span>
            </h2>
            <div className="w-12 sm:w-16 h-px bg-[#576953] mb-6 sm:mb-8" />
          </motion.div>

          {/* Right side - main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8"
          >
            {/* Philosophy card */}
            <div className="bg-[#262b26]/80 backdrop-blur-sm border border-[#3a4438] p-5 sm:p-8 lg:p-12 mb-10 sm:mb-16 hover-glow transition-all duration-500">
              <p className="text-base sm:text-lg lg:text-xl text-[#8a9d86] leading-relaxed mb-4 sm:mb-6">
                Security research driven by{" "}
                <span className="text-[#F1F7ED] font-medium">curiosity</span>, not quotas.
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#576953] tracking-tight-hero mb-4 sm:mb-6">
                Understanding comes first.
              </p>
              <p className="text-sm sm:text-base text-[#8a9d86] leading-relaxed">
                I specialize in AI/ML infrastructure — the systems that power modern intelligence.
                My approach is methodical: understand deeply before testing.
                Quality findings matter more than quantity.
              </p>
            </div>

            {/* Values grid - asymmetric */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#3a4438]">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="bg-[#191D19]/70 backdrop-blur-sm p-4 sm:p-6 lg:p-8 group hover:bg-[#262b26]/80 transition-all duration-300"
                >
                  <value.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xs sm:text-sm font-semibold text-[#F1F7ED] mb-1 sm:mb-2 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#8a9d86] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
