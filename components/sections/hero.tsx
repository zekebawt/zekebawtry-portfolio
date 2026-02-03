"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-shadow-grey">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bronze/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-bronze-dark/5 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bronze/10 border border-bronze/20 mb-8"
        >
          <Zap className="w-4 h-4 text-bronze" />
          <span className="text-sm text-bronze-light font-medium">Full-Stack Developer</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">Zeke Bawtry</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Building software with purpose. Crafting code that solves real problems and drives impact.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient">2</div>
            <div className="text-sm text-slate-500 mt-1">PRs Merged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient">$100</div>
            <div className="text-sm text-slate-500 mt-1">Bounty Income</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gradient">Day 1</div>
            <div className="text-sm text-slate-500 mt-1">Growth Journey</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-bronze hover:bg-bronze-light text-shadow-grey font-semibold px-8 py-6 text-lg glow-bronze-soft"
          >
            <Link href="#dashboard">View Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg"
          >
            <Link href="#about">Learn My Story</Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Link
            href="https://github.com/zekebawt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-ebony/50 border border-ebony-light hover:border-bronze/50 hover:bg-bronze/10 transition-all"
          >
            <Github className="w-5 h-5 text-slate-400 hover:text-bronze" />
          </Link>
          <Link
            href="https://twitter.com/zekebawtry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-ebony/50 border border-ebony-light hover:border-bronze/50 hover:bg-bronze/10 transition-all"
          >
            <Twitter className="w-5 h-5 text-slate-400 hover:text-bronze" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
