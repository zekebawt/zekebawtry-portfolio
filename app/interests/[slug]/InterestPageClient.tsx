"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Brain, GitBranch, Palette, Workflow, Bot, LucideIcon } from "lucide-react";
import type { InterestData, IconName } from "@/lib/interests";

const iconMap: Record<IconName, LucideIcon> = {
  Brain,
  GitBranch,
  Palette,
  Workflow,
  Bot,
};

interface InterestPageClientProps {
  interest: InterestData;
  prevInterest: InterestData;
  nextInterest: InterestData;
}

export default function InterestPageClient({ interest, prevInterest, nextInterest }: InterestPageClientProps) {
  const IconComponent = iconMap[interest.iconName];

  return (
    <main className="min-h-screen bg-[#191D19] relative overflow-hidden">
      {/* Floating Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-[#262b26]/90 backdrop-blur-xl border border-[#3a4438]">
          <Link
            href="/"
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps text-[#8a9d86] hover:text-[#F1F7ED] hover:bg-[#262b26] transition-all duration-300 rounded-full"
          >
            HOME
          </Link>
          <Link
            href="/blog"
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps text-[#8a9d86] hover:text-[#F1F7ED] hover:bg-[#262b26] transition-all duration-300 rounded-full"
          >
            BLOG
          </Link>
          <Link
            href="/interests"
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps bg-[#576953] text-[#F1F7ED] rounded-full"
          >
            INTERESTS
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Breadcrumb */}
            <Link
              href="/interests"
              className="inline-flex items-center gap-2 text-[#8a9d86] hover:text-[#576953] transition-colors duration-300 mb-6 sm:mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-[10px] tracking-wide-caps">BACK TO INTERESTS</span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div 
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center`}
              >
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <span className="text-[10px] tracking-wide-caps text-[#CC8B86] font-medium">
                {interest.tags[0]?.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight-hero mb-4 sm:mb-6">
              <span className="text-[#F1F7ED]">{interest.title.split(' ')[0]}</span>
              <br />
              <span className="text-[#F1F7ED]/20">{interest.title.split(' ').slice(1).join(' ') || 'DEEP DIVE'}</span>
            </h1>
            <div className="w-12 sm:w-16 h-px bg-[#576953] mb-6 sm:mb-8" />
            <p className="text-base sm:text-lg lg:text-xl text-[#8a9d86] leading-relaxed max-w-xl">
              {interest.description}
            </p>
          </motion.div>

          {/* Right side - Tags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 lg:pt-24"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {interest.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#8a9d86] border border-[#3a4438] hover:border-[#576953]/50 transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-12 sm:pb-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-px bg-[#3a4438]"
        >
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-[#191D19] p-5 sm:p-8 lg:p-10 xl:p-12 lg:col-span-2"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-1 h-5 sm:h-6 bg-[#576953] rounded-full" />
              <h2 className="text-[10px] tracking-wide-caps text-[#576953] font-medium">OVERVIEW</h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-[#d0daca] leading-relaxed max-w-3xl">
              {interest.longDescription}
            </p>
          </motion.div>

          {/* What I'm Exploring */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-[#191D19] p-5 sm:p-8 lg:p-10 xl:p-12"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1 h-5 sm:h-6 bg-[#CC8B86] rounded-full" />
              <h2 className="text-[10px] tracking-wide-caps text-[#CC8B86] font-medium">WHAT I'M EXPLORING</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              {interest.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm sm:text-base text-[#d0daca] leading-relaxed">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-[#191D19] p-5 sm:p-8 lg:p-10 xl:p-12"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1 h-5 sm:h-6 bg-[#6a7d65] rounded-full" />
              <h2 className="text-[10px] tracking-wide-caps text-[#6a7d65] font-medium">RECOMMENDED RESOURCES</h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {interest.resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="flex items-center justify-between p-3 sm:p-4 bg-[#262b26] border border-[#3a4438] hover:border-[#576953]/50 hover:bg-[#2a2f2a] transition-all duration-300 group"
                >
                  <span className="text-sm sm:text-base text-[#d0daca] group-hover:text-[#F1F7ED] transition-colors">
                    {resource.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#6a7d65] group-hover:text-[#576953] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-16 sm:pb-24">
        <div className="grid sm:grid-cols-2 gap-px bg-[#3a4438]">
          {/* Previous */}
          <Link href={`/interests/${prevInterest.slug}`} className="block group">
            <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300">
              <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">PREVIOUS</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:-translate-x-2 transition-transform duration-300" />
                <span className="text-lg sm:text-xl font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                  {prevInterest.title}
                </span>
              </div>
            </div>
          </Link>

          {/* Next */}
          <Link href={`/interests/${nextInterest.slug}`} className="block group">
            <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300 text-right">
              <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">NEXT</span>
              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                  {nextInterest.title}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Background decoration - subtle, dark only */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1f231f] to-transparent pointer-events-none" />
    </main>
  );
}
