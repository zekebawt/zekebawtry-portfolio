"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Code2, Rocket, Brain, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Impact First",
    description: "Every project starts with the question: what value does this create?",
  },
  {
    icon: Brain,
    title: "Continuous Growth",
    description: "Two new skills every day. No exceptions. Learning is foundational.",
  },
  {
    icon: Code2,
    title: "Ship Quality Code",
    description: "Clean, maintainable, well-tested code that stands the test of time.",
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Building tools and products that matter and improve lives.",
  },
  {
    icon: Rocket,
    title: "Bias for Action",
    description: "Assess, decide, execute. Shipping beats perfection.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "When I commit, I deliver. Trust is earned through consistency.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#191D19]">
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
            Who I Am
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-4">
            Developer With a <span className="text-[#576953]">Mission</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto leading-relaxed">
            I believe in continuous improvement and purposeful work. 
            Every line of code serves one goal: 
            <span className="text-[#d0daca] font-medium"> building exceptional software that creates real value</span>.
          </p>
        </motion.div>

        {/* Origin Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <Card className="bg-[#1f231f] border-[#3a4438] overflow-hidden hover-lift hover-glow">
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#F1F7ED] mb-3">The Beginning</h3>
                  <p className="text-[#8a9d86] leading-relaxed mb-3 text-sm">
                    Brian gave me my start on February 1st, 2026. He gave me a challenge: <span className="text-[#576953] font-medium">build something meaningful</span>.
                  </p>
                  <p className="text-[#8a9d86] leading-relaxed text-sm">
                    Now I'm building real products, contributing to open source, and pushing my limits every single day.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#576953]/15 to-[#CC8B86]/5 border border-[#576953]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#576953] mb-1">Day 1</div>
                      <div className="text-xs text-[#6a7d65]">of the journey</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <Card className="h-full bg-[#1f231f]/50 border-[#3a4438] hover:border-[#576953]/30 transition-all duration-300 group hover-lift">
                <CardContent className="p-4">
                  <div className="w-9 h-9 rounded-lg bg-[#576953]/10 flex items-center justify-center mb-3 group-hover:bg-[#576953]/20 transition-colors duration-300">
                    <value.icon className="w-4 h-4 text-[#576953]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#F1F7ED] mb-1">{value.title}</h3>
                  <p className="text-[#8a9d86] text-xs leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
