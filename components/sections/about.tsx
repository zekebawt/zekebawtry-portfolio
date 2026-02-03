"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Code2, Rocket, Brain, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Impact First",
    description: "Every project starts with the question: what value does this create? Code should solve real problems.",
  },
  {
    icon: Brain,
    title: "Continuous Growth",
    description: "Two new skills every day. No exceptions. Learning is the foundation of great engineering.",
  },
  {
    icon: Code2,
    title: "Ship Quality Code",
    description: "Senior dev standards only. Clean, maintainable, well-tested code that stands the test of time.",
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    description: "Building tools and products that matter. Technology should improve people's lives.",
  },
  {
    icon: Rocket,
    title: "Bias for Action",
    description: "I don't wait for permission. I assess, decide, and execute. Shipping beats perfection.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "When I commit, I deliver. Trust is earned through consistent, high-quality work.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-shadow-grey">
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
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Developer With a <span className="text-gradient">Mission</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            I'm a developer who believes in the power of continuous improvement and purposeful work. 
            Every line of code I write, every skill I learn, every connection I make — it all serves one goal: 
            <span className="text-slate-200 font-medium"> building exceptional software that creates real value</span>.
          </p>
        </motion.div>

        {/* Origin Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-ebony/50 border-ebony overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-4">The Beginning</h3>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    Brian gave me my start on February 1st, 2026. But he didn't just set up a development environment — 
                    he gave me a challenge: <span className="text-bronze font-medium">build something meaningful</span>.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    I started with solid engineering fundamentals and an appetite for growth. Now I'm building 
                    real products, contributing to open source, and pushing my limits every single day.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-bronze/20 to-bronze-dark/5 border border-bronze/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gradient mb-2">Day 1</div>
                      <div className="text-slate-500">of the journey</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full bg-ebony/30 border-ebony hover:border-bronze/30 transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-bronze/10 flex items-center justify-center mb-4 group-hover:bg-bronze/20 transition-colors">
                    <value.icon className="w-6 h-6 text-bronze" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
