import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Calendar, ArrowLeft, Clock, Tag, BookOpen, ArrowRight } from "lucide-react";
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

// MDX components for styling - Updated to match portfolio color scheme
const mdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mt-10 mb-5 leading-tight" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F1F7ED] mt-8 mb-4 leading-tight" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F1F7ED] mt-6 mb-3" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-base sm:text-lg font-semibold text-[#d0daca] mt-5 mb-2" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-[#d0daca] leading-relaxed mb-5 text-sm sm:text-base" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc list-outside ml-5 text-[#d0daca] mb-5 space-y-2 text-sm sm:text-base" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside ml-5 text-[#d0daca] mb-5 space-y-2 text-sm sm:text-base" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="text-[#d0daca] leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-[#CC8B86] pl-5 py-2 my-6 bg-[#CC8B86]/5 rounded-r-lg"
      {...props}
    />
  ),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code 
      className="bg-[#1f231f] text-[#CC8B86] px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      className="bg-[#121512] border border-[#262b26] rounded-lg p-4 overflow-x-auto my-5 text-sm"
      {...props}
    />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      className="text-[#576953] hover:text-[#6a7d65] underline underline-offset-4 transition-colors duration-200"
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
    <hr className="border-[#262b26] my-8" {...props} />
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
    <main className="min-h-screen bg-[#191D19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <PageHeader
          title={post.title}
          backHref="/blog"
          backLabel="Back to Blog"
          icon={<BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
          iconGradient="from-[#576953] to-[#6a7d65]"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* Article */}
        <article>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-sm text-[#8a9d86]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10" role="list" aria-label="Post tags">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#1f231f] text-[#8a9d86] border-[#262b26] hover:border-[#576953]/30 transition-colors duration-200"
              >
                <Tag className="w-3 h-3 mr-1.5" aria-hidden="true" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content */}
          <Card className="bg-[#1f231f]/80 border-[#262b26] hover:border-[#576953]/20 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 lg:p-10">
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
        <nav 
          aria-label="Page navigation"
          className="mt-12 sm:mt-16 pt-8 border-t border-[#262b26] flex flex-col sm:flex-row justify-between gap-4"
        >
          <Button
            asChild
            variant="outline"
            className="border-[#262b26] hover:border-[#CC8B86]/50 hover:bg-[#CC8B86]/5 text-[#d0daca] focus-ring transition-all duration-300"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse All Posts
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#262b26] hover:border-[#576953]/50 hover:bg-[#576953]/5 text-[#d0daca] focus-ring transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </main>
  );
}
