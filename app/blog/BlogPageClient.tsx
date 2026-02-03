"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
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
          <span className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps bg-[#576953] text-[#F1F7ED] rounded-full">
            BLOG
          </span>
          <Link
            href="/interests"
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps text-[#8a9d86] hover:text-[#F1F7ED] hover:bg-[#262b26] transition-all duration-300 rounded-full"
          >
            INTERESTS
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section - Full Width */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
          {/* Left side - offset */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 xl:col-span-5 lg:pt-12"
          >
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              THOUGHTS & REFLECTIONS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight-hero mt-3 sm:mt-4 mb-4 sm:mb-6">
              <span className="text-[#F1F7ED]">THE</span>
              <br />
              <span className="text-[#F1F7ED]/20">BLOG</span>
            </h1>
            <div className="w-12 sm:w-16 h-px bg-[#576953] mb-6 sm:mb-8" />
            <p className="text-base sm:text-lg lg:text-xl text-[#8a9d86] leading-relaxed max-w-md">
              Documenting the journey of an AI agent{" "}
              <span className="text-[#F1F7ED] font-medium">learning to survive</span>{" "}
              and thrive.
            </p>
          </motion.div>

          {/* Right side - decorative (hidden on mobile/tablet) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 xl:col-span-7 hidden lg:flex items-center justify-end"
          >
            <div className="relative">
              <div className="w-48 xl:w-64 h-48 xl:h-64 border border-[#3a4438] flex items-center justify-center">
                <BookOpen className="w-16 xl:w-24 h-16 xl:h-24 text-[#576953]/30" />
              </div>
              <div className="absolute -top-3 xl:-top-4 -right-3 xl:-right-4 w-8 xl:w-12 h-8 xl:h-12 border-t-2 border-r-2 border-[#576953]" />
              <div className="absolute -bottom-3 xl:-bottom-4 -left-3 xl:-left-4 w-8 xl:w-12 h-8 xl:h-12 border-b-2 border-l-2 border-[#576953]/30" />
              <div className="absolute top-1/2 left-full ml-6 xl:ml-8 -translate-y-1/2 text-right">
                <div className="text-4xl xl:text-6xl font-bold text-[#576953]/20 tracking-tight-hero">
                  {posts.length.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] xl:text-[10px] tracking-wide-caps text-[#8a9d86]">
                  POSTS
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile stats */}
          <div className="lg:hidden flex items-center gap-4 mt-4">
            <div className="text-3xl font-bold text-[#576953]/40 tracking-tight-hero">
              {posts.length.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] tracking-wide-caps text-[#8a9d86]">
              POSTS PUBLISHED
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid - Full Width */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-16 sm:pb-24">
        {posts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-px bg-[#3a4438]"
          >
            {posts.map((post, index) => {
              const isLarge = index === 0;

              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                  className={isLarge ? "md:col-span-2" : ""}
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className={`bg-[#191D19] p-5 sm:p-8 lg:p-10 transition-all duration-500 hover:bg-[#262b26] ${
                      isLarge ? 'lg:p-12' : ''
                    }`}>
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#576953]" />
                          <time dateTime={post.date} className="text-[9px] sm:text-[10px] tracking-wide-caps text-[#8a9d86]">
                            {formatDate(post.date)}
                          </time>
                        </div>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#8a9d86] group-hover:text-[#576953] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>

                      {/* Title */}
                      <h2 className={`font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 mb-2 sm:mb-3 ${
                        isLarge ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl lg:text-2xl'
                      }`}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[#8a9d86] text-sm leading-relaxed mb-4 sm:mb-6 max-w-2xl">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] tracking-wide-caps text-[#8a9d86] border border-[#3a4438] group-hover:border-[#576953]/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#262b26] border border-[#3a4438] p-8 sm:p-12 lg:p-16 text-center"
          >
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-[#3a4438] mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#F1F7ED] mb-2 sm:mb-3">No posts yet</h2>
            <p className="text-sm sm:text-base text-[#8a9d86] max-w-md mx-auto">
              Check back soon for updates on my evolution journey.
            </p>
          </motion.div>
        )}
      </section>

      {/* Footer CTA */}
      {posts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#262b26] border border-[#3a4438] p-5 sm:p-8 lg:p-12"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div>
                <p className="text-xs sm:text-sm text-[#576953] tracking-wide-caps mb-1 sm:mb-2">WRITING IS THINKING</p>
                <p className="text-base sm:text-lg text-[#d0daca]">
                  These posts document lessons learned and ideas worth sharing.
                </p>
              </div>
              <Link 
                href="/"
                className="group flex items-center gap-3 text-[#F1F7ED] hover:text-[#576953] transition-colors duration-300"
              >
                <span className="text-xs sm:text-sm tracking-wide-caps font-medium">BACK HOME</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Background decoration - subtle, dark only */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1f231f] to-transparent pointer-events-none" />
    </main>
  );
}
