"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface BlogProps {
  posts: BlogPost[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog({ posts }: BlogProps) {
  // If no posts, don't render the section
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          <div>
            <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
              WRITING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight-hero mt-3 sm:mt-4">
              <span className="text-[#F1F7ED]">FROM THE</span>
              <br />
              <span className="text-[#F1F7ED]/20">FIELD</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-[#8a9d86] hover:text-[#576953] transition-colors duration-300"
          >
            <span className="text-xs sm:text-sm tracking-wide-caps">VIEW ALL POSTS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Blog posts - editorial layout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-px bg-[#3a4438]"
        >
          {posts.map((post, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className={isFeatured ? "lg:col-span-2" : ""}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className={`bg-[#191D19] p-5 sm:p-8 lg:p-10 transition-all duration-500 hover:bg-[#262b26] ${
                    isFeatured ? 'lg:p-12' : ''
                  }`}>
                    {/* Meta */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[#8a9d86]">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <time className="text-[10px] sm:text-xs tracking-wide-caps">{formatDate(post.date)}</time>
                      </div>
                      {isFeatured && (
                        <span className="text-[9px] sm:text-[10px] tracking-wide-caps text-[#576953] bg-[#576953]/10 px-1.5 sm:px-2 py-0.5 sm:py-1">
                          LATEST
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 mb-3 sm:mb-4 ${
                      isFeatured ? 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl' : 'text-lg sm:text-xl lg:text-2xl'
                    }`}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-[#8a9d86] leading-relaxed mb-4 sm:mb-6 ${
                      isFeatured ? 'text-sm sm:text-base max-w-3xl' : 'text-xs sm:text-sm'
                    }`}>
                      {post.excerpt}
                    </p>

                    {/* Tags and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] tracking-wide-caps text-[#8a9d86] border border-[#3a4438] group-hover:border-[#576953]/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="hidden sm:flex items-center gap-2 text-xs tracking-wide-caps text-[#576953] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        READ
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-xs sm:text-sm text-[#8a9d86]">
            Occasional notes on security research and the landscape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
