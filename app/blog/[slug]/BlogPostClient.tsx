"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// MDX components for styling
const mdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1F7ED] mt-10 sm:mt-12 mb-4 sm:mb-6 tracking-tight-hero" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F1F7ED] mt-8 sm:mt-10 mb-3 sm:mb-4 tracking-tight-hero" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#F1F7ED] mt-6 sm:mt-8 mb-2 sm:mb-3" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-base sm:text-lg font-semibold text-[#d0daca] mt-4 sm:mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-[#d0daca] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc list-outside ml-4 sm:ml-6 text-[#d0daca] mb-4 sm:mb-6 space-y-1.5 sm:space-y-2" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside ml-4 sm:ml-6 text-[#d0daca] mb-4 sm:mb-6 space-y-1.5 sm:space-y-2" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="text-sm sm:text-base text-[#d0daca] leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-[#CC8B86] pl-4 sm:pl-6 py-2 sm:py-3 my-6 sm:my-8 bg-[#CC8B86]/5"
      {...props}
    />
  ),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code 
      className="bg-[#262b26] text-[#CC8B86] px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      className="bg-[#121512] border border-[#3a4438] p-4 sm:p-6 overflow-x-auto my-4 sm:my-6 text-xs sm:text-sm"
      {...props}
    />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      className="text-[#576953] hover:text-[#8a9d86] underline underline-offset-4 transition-colors duration-200"
      {...props}
    />
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="text-[#F1F7ED] font-semibold" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="text-[#d0daca] italic" {...props} />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr className="border-[#3a4438] my-8 sm:my-12" {...props} />
  ),
};

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostClient({ post, prevPost, nextPost }: BlogPostClientProps) {
  const readTime = estimateReadTime(post.content);

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
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps bg-[#576953] text-[#F1F7ED] rounded-full"
          >
            BLOG
          </Link>
          <Link
            href="/interests"
            className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-wide-caps text-[#8a9d86] hover:text-[#F1F7ED] hover:bg-[#262b26] transition-all duration-300 rounded-full"
          >
            INTERESTS
          </Link>
        </div>
      </motion.nav>

      {/* Full-Width Hero */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#8a9d86] hover:text-[#576953] transition-colors duration-300 mb-6 sm:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-[10px] tracking-wide-caps">BACK TO BLOG</span>
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-[#8a9d86]">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <time dateTime={post.date} className="text-[10px] tracking-wide-caps">
                {formatDate(post.date)}
              </time>
            </div>
            <div className="flex items-center gap-2 text-[#8a9d86]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] tracking-wide-caps">{readTime} MIN READ</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight-hero mb-6 sm:mb-8 max-w-4xl">
            <span className="text-[#F1F7ED]">{post.title}</span>
          </h1>
          <div className="w-16 sm:w-24 h-px bg-[#576953] mb-6 sm:mb-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {post.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#8a9d86] border border-[#3a4438]"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-12 sm:pb-16">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#262b26] border border-[#3a4438] p-5 sm:p-8 lg:p-12 xl:p-16"
        >
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <MDXRemote 
              source={post.content}
              components={mdxComponents}
            />
          </div>
        </motion.article>
      </section>

      {/* Navigation Footer */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pb-16 sm:pb-24">
        <div className="grid sm:grid-cols-2 gap-px bg-[#3a4438]">
          {/* Previous */}
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="block group">
              <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300">
                <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">PREVIOUS</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:-translate-x-2 transition-transform duration-300 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 line-clamp-1">
                    {prevPost.title}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/blog" className="block group">
              <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300">
                <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">BACK TO</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:-translate-x-2 transition-transform duration-300" />
                  <span className="text-base sm:text-lg font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                    All Posts
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Next */}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="block group">
              <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300 text-right">
                <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">NEXT</span>
                <div className="flex items-center justify-end gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 line-clamp-1">
                    {nextPost.title}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/" className="block group">
              <div className="bg-[#191D19] p-5 sm:p-8 lg:p-10 hover:bg-[#262b26] transition-all duration-300 text-right">
                <span className="text-[10px] tracking-wide-caps text-[#8a9d86] mb-1 sm:mb-2 block">GO TO</span>
                <div className="flex items-center justify-end gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg font-bold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                    Home
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#576953] group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Background decoration - subtle, dark only */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1f231f] to-transparent pointer-events-none" />
    </main>
  );
}
