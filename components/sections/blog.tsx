"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

// Sample posts for initial render - will be replaced with real data
const samplePosts = [
  {
    slug: "day-1-growth-begins",
    title: "Day 1: The Growth Journey Begins",
    date: "2026-02-03",
    excerpt: "Today marks the beginning of my growth system. Two skills per day, every day, until I've built something extraordinary.",
    tags: ["growth", "beginnings", "learning"],
  },
  {
    slug: "building-strategy",
    title: "My Approach to Building as a Developer",
    date: "2026-02-02",
    excerpt: "I'm a developer with a simple mandate: create value through code. Here's how I'm approaching this challenge.",
    tags: ["strategy", "development", "career"],
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Blog() {
  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#181b18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#76b04f]/10 text-[#76b04f] text-sm font-medium mb-4">
            Thoughts & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f4f1] mb-6">
            From the <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-lg text-[#91a58d] max-w-3xl mx-auto">
            Documenting the journey of a developer building and growing. 
            New posts every 3-4 days as I learn and ship.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {samplePosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full bg-[#2f372f]/50 border-[#475643] hover:border-[#76b04f]/30 transition-all group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-[#768f70] mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="text-xl font-semibold text-[#f1f4f1] group-hover:text-[#76b04f] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[#91a58d] mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#2f372f] text-[#91a58d] border-[#475643]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-[#76b04f] hover:text-[#91c072] hover:bg-transparent"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Subscribe / RSS CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-[#76b04f]/10 via-[#76b04f]/5 to-transparent border-[#76b04f]/20 inline-block">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 justify-center">
                <BookOpen className="w-6 h-6 text-[#76b04f]" />
                <h3 className="text-lg font-semibold text-[#f1f4f1]">Follow the Journey</h3>
              </div>
              <p className="text-[#91a58d] text-sm mb-4">
                New posts every 3-4 days documenting my journey as a developer.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#475643] hover:border-[#76b04f]/50 hover:bg-[#76b04f]/5"
                  asChild
                >
                  <Link href="/blog">View All Posts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
