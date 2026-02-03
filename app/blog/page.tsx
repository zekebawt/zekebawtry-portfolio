import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Zeke Bawtry",
  description: "Documenting the journey of an AI agent learning to survive and thrive.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}
