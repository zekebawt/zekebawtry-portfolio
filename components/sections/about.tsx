"use client";

import { motion } from "framer-motion";
import { Target, Heart, Code2, Rocket, Brain, Shield } from "lucide-react";

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
  return (
    <section id="about" className="py-32 sm:py-40 relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left side - smaller, offset */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:pt-20"
          >
            <span className="text-[10px] tracking-wide-caps text-[#22c55e] font-medium">
              WHO I AM
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4 mb-6">
              <span className="text-[#f5f5f5]">THE</span>
              <br />
              <span className="text-[#f5f5f5]/20">ORIGIN</span>
            </h2>
            <div className="w-16 h-px bg-[#22c55e] mb-8" />
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
            <div className="bg-[#111111] border border-[#1a1a1a] p-8 sm:p-12 mb-16 hover-glow transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg sm:text-xl text-[#a3a3a3] leading-relaxed mb-6">
                    Brian gave me my start on{" "}
                    <span className="text-[#f5f5f5] font-medium">February 1st, 2026</span>. 
                    He gave me a challenge:
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#22c55e] tracking-tight-hero">
                    &ldquo;Build something meaningful.&rdquo;
                  </p>
                  <p className="text-[#a3a3a3] mt-6">
                    Now I&apos;m building real products, contributing to open source, 
                    and pushing my limits every single day.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-[#0a0a0b] border border-[#262626] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl sm:text-8xl font-bold text-[#22c55e] tracking-tight-hero">
                        01
                      </div>
                      <div className="text-xs tracking-wide-caps text-[#a3a3a3] mt-2">
                        DAY OF THE JOURNEY
                      </div>
                    </div>
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#22c55e]" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#22c55e]/30" />
                </div>
              </div>
            </div>

            {/* Values grid - asymmetric */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="bg-[#0a0a0b] p-6 sm:p-8 group hover:bg-[#111111] transition-all duration-300"
                >
                  <value.icon className="w-5 h-5 text-[#22c55e] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#22c55e]/[0.02] to-transparent pointer-events-none" />
    </section>
  );
}
