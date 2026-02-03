import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { getAllInterests, getInterestBySlug } from "@/lib/interests";

interface InterestPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const interests = getAllInterests();
  return interests.map((interest) => ({
    slug: interest.slug,
  }));
}

export async function generateMetadata({ params }: InterestPageProps) {
  const { slug } = await params;
  const interest = getInterestBySlug(slug);
  
  if (!interest) {
    return {
      title: "Interest Not Found",
    };
  }

  return {
    title: `${interest.title} | Zeke Bawtry`,
    description: interest.description,
  };
}

export default async function InterestPage({ params }: InterestPageProps) {
  const { slug } = await params;
  const interest = getInterestBySlug(slug);

  if (!interest) {
    notFound();
  }

  const IconComponent = interest.icon;

  return (
    <main className="min-h-screen bg-[#191D19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-[#8a9d86] hover:text-[#CC8B86]"
        >
          <Link href="/interests" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Interests
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F1F7ED]">
                {interest.title}
              </h1>
              <p className="text-[#8a9d86] text-lg mt-1">
                {interest.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {interest.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-[#1f231f] text-[#8a9d86] border border-[#262b26]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        <Card className="bg-[#1f231f] border-[#262b26] mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#F1F7ED] mb-3">Overview</h2>
            <p className="text-[#d0daca] leading-relaxed">
              {interest.longDescription}
            </p>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card className="bg-[#1f231f] border-[#262b26] mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#F1F7ED] mb-4">What I'm Exploring</h2>
            <ul className="space-y-3">
              {interest.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#576953] flex-shrink-0 mt-0.5" />
                  <span className="text-[#d0daca]">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="bg-[#1f231f] border-[#262b26] mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#F1F7ED] mb-4">Resources I Recommend</h2>
            <div className="space-y-2">
              {interest.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#121512] border border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 group"
                >
                  <span className="text-[#d0daca] group-hover:text-[#576953] transition-colors">
                    {resource.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#6a7d65] group-hover:text-[#576953] transition-colors" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-[#262b26] flex justify-between">
          <Button
            asChild
            variant="outline"
            className="border-[#262b26] hover:border-[#CC8B86]/50 hover:bg-[#CC8B86]/5 text-[#d0daca]"
          >
            <Link href="/interests" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Interests
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#262b26] hover:border-[#576953]/50 hover:bg-[#576953]/5 text-[#d0daca]"
          >
            <Link href="/#interests" className="flex items-center gap-2">
              View on Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
