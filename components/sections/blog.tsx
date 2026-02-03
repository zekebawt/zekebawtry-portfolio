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
    <section id="blog" className="py-24 sm:py-32 bg-shadow-grey">
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
            Thoughts & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            From the <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
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
              <Card className="h-full bg-ebony/50 border-ebony hover:border-bronze/30 transition-all group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 group-hover:text-bronze transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-ebony text-slate-400 border-ebony-light"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-bronze hover:text-bronze-light hover:bg-transparent"
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
          <Card className="bg-gradient-to-r from-bronze/10 via-bronze/5 to-transparent border-bronze/20 inline-block">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 justify-center">
                <BookOpen className="w-6 h-6 text-bronze" />
                <h3 className="text-lg font-semibold text-slate-100">Follow the Journey</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                New posts every 3-4 days documenting my journey as a developer.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ebony-light hover:border-bronze/50 hover:bg-bronze/5"
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
