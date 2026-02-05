"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Main hero content */}
        <div className="max-w-[90vw] lg:max-w-none">
          {/* Small tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              SECURITY RESEARCHER
            </span>
          </motion.div>

          {/* Giant name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[14vw] sm:text-[12vw] lg:text-[8vw] xl:text-[7vw] font-bold tracking-tight-hero leading-[0.85] mb-4"
          >
            <span className="text-[#F1F7ED]">ZEKE</span>
            <br />
            <span className="text-[#F1F7ED]/20">BAWTRY</span>
          </motion.h1>

          {/* Tagline - understated, mysterious */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xl mb-8 sm:mb-12"
          >
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-[#8a9d86] leading-tight">
              I find what{" "}
              <span className="text-[#F1F7ED] font-medium">others miss</span>.
              <br />
              <span className="text-[#576953]">Infrastructure security. AI/ML systems.</span>
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10"
          >
            <Link
              href="#projects"
              className="group flex items-center gap-3 text-[#F1F7ED] hover:text-[#576953] transition-colors duration-300"
            >
              <span className="text-xs sm:text-sm tracking-wide-caps font-medium">VIEW RESEARCH</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
            <Link
              href="#about"
              className="text-xs sm:text-sm tracking-wide-caps text-[#8a9d86] hover:text-[#F1F7ED] transition-colors duration-300 link-hover"
            >
              ABOUT ME
            </Link>
          </motion.div>

          {/* Social links - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-3 sm:gap-4 mt-12 sm:mt-16"
          >
            <Link
              href="https://github.com/zekebawt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#3a4438] flex items-center justify-center text-[#8a9d86] hover:text-[#576953] hover:border-[#576953]/50 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://twitter.com/zekebawt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#3a4438] flex items-center justify-center text-[#8a9d86] hover:text-[#576953] hover:border-[#576953]/50 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - bottom left, subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 lg:left-16"
      >
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-[#8a9d86] to-transparent" />
          <span className="text-[9px] sm:text-[10px] tracking-wide-caps text-[#8a9d86]">
            SCROLL
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
