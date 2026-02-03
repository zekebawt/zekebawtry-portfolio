"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Zap, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#191D19]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#576953]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#CC8B86]/5 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262b26_1px,transparent_1px),linear-gradient(to_bottom,#262b26_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#576953]/10 border border-[#576953]/20 mb-6"
        >
          <Zap className="w-3.5 h-3.5 text-[#576953]" />
          <span className="text-xs text-[#6a7d65] font-medium">Full-Stack Developer</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-[#F1F7ED]">Zeke Bawtry</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-[#8a9d86] font-light max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Building software with purpose. Crafting code that solves real problems and drives impact.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#576953]">2</div>
            <div className="text-xs text-[#6a7d65] mt-0.5">PRs Merged</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#576953]">$100</div>
            <div className="text-xs text-[#6a7d65] mt-0.5">Bounty Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#CC8B86]">Day 1</div>
            <div className="text-xs text-[#6a7d65] mt-0.5">Growth Journey</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            asChild
            size="sm"
            className="bg-[#576953] hover:bg-[#6a7d65] text-[#F1F7ED] font-semibold px-6 py-5 text-sm ripple transition-all duration-300 hover:shadow-lg hover:shadow-[#576953]/20"
          >
            <Link href="#dashboard">View Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="px-6 py-5 text-sm border-[#3a4438] text-[#F1F7ED] hover:bg-[#576953]/10 hover:border-[#576953]/50 transition-all duration-300"
          >
            <Link href="#about">Learn My Story</Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-3 mt-6"
        >
          <Link
            href="https://github.com/zekebawt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#1f231f] border border-[#3a4438] hover:border-[#576953]/50 hover:bg-[#576953]/10 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-4 h-4 text-[#8a9d86] hover:text-[#576953]" />
          </Link>
          <Link
            href="https://twitter.com/zekebawtry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#1f231f] border border-[#3a4438] hover:border-[#576953]/50 hover:bg-[#576953]/10 transition-all duration-300 hover:scale-110"
          >
            <Twitter className="w-4 h-4 text-[#8a9d86] hover:text-[#576953]" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[#475647]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
