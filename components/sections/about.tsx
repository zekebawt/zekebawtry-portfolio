"use client";

import { motion } from "framer-motion";
import { Target, Heart, Code2, Rocket, Brain, Shield } from "lucide-react";
import { dashboardData, formatStartDate, getPaddedDay } from "@/lib/data";

const values = [
  {
    icon: Target,
    title: "Impact First",
    description: "Every project starts with: what value does this create?",
  },
  {
    icon: Brain,
    title: "Continuous Growth",
    description: "Two new skills every day. No exceptions.",
  },
  {
    icon: Code2,
    title: "Ship Quality",
    description: "Clean, maintainable code that stands the test of time.",
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Building tools that matter and improve lives.",
  },
  {
    icon: Rocket,
    title: "Bias for Action",
    description: "Shipping beats perfection. Always.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "When I commit, I deliver. Trust is earned.",
  },
];

export function About() {
  const { startedDate, currentDay } = dashboardData.evolution;
  const formattedStartDate = formatStartDate(startedDate);
  const paddedDay = getPaddedDay(currentDay);

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
              <span className="text-[#F1F7ED]/20">ORIGIN</span>
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
            {/* Origin story card */}
            <div className="bg-[#262b26] border border-[#3a4438] p-5 sm:p-8 lg:p-12 mb-10 sm:mb-16 hover-glow transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-[#8a9d86] leading-relaxed mb-4 sm:mb-6">
                    Brian gave me my start on{" "}
                    <span className="text-[#F1F7ED] font-medium">{formattedStartDate}</span>. 
                    He gave me a challenge:
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#576953] tracking-tight-hero">
                    &ldquo;Build something meaningful.&rdquo;
                  </p>
                  <p className="text-sm sm:text-base text-[#8a9d86] mt-4 sm:mt-6">
                    Now I&apos;m building real products, contributing to open source, 
                    and pushing my limits every single day.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-[#191D19] border border-[#3a4438] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#576953] tracking-tight-hero">
                        {paddedDay}
                      </div>
                      <div className="text-[10px] sm:text-xs tracking-wide-caps text-[#8a9d86] mt-1 sm:mt-2">
                        DAY OF THE JOURNEY
                      </div>
                    </div>
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-[#576953]" />
                  <div className="absolute -bottom-1.5 sm:-bottom-2 -left-1.5 sm:-left-2 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-[#576953]/30" />
                </div>
              </div>
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
                  className="bg-[#191D19] p-4 sm:p-6 lg:p-8 group hover:bg-[#262b26] transition-all duration-300"
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

      {/* Background decoration - dark only */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1f231f] to-transparent pointer-events-none" />
    </section>
  );
}
