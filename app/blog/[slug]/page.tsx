import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Zeke Bawtry`,
    description: post.excerpt,
  };
}

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
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-12 mb-6" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-10 mb-5" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mt-8 mb-4" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold text-slate-200 mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-relaxed mb-6" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-slate-300 mb-6 space-y-2" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="text-slate-300 leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-[#cd7f32] pl-6 py-2 my-8 bg-[#1e293b]/50 rounded-r-lg"
      {...props}
    />
  ),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code 
      className="bg-[#1e293b] text-[#cd7f32] px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      className="text-[#cd7f32] hover:text-[#d4a574] underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="text-slate-100 font-semibold" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="text-slate-200 italic" {...props} />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr className="border-[#334155] my-8" {...props} />
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = estimateReadTime(post.content);

  return (
    <main className="min-h-screen bg-[#0f172a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-slate-400 hover:text-[#cd7f32]"
        >
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#1e293b] text-slate-300 border-[#334155]"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Content */}
          <Card className="bg-[#1e293b]/50 border-[#334155]">
            <CardContent className="p-8 sm:p-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <MDXRemote 
                  source={post.content}
                  components={mdxComponents}
                />
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-[#334155]">
          <Button
            asChild
            variant="outline"
            className="border-[#334155] hover:border-[#cd7f32]/50 hover:bg-[#cd7f32]/5"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse All Posts
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
