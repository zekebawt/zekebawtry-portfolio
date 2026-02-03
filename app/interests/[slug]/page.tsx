import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <PageHeader
          title={interest.title}
          subtitle={interest.description}
          backHref="/interests"
          backLabel="Back to Interests"
          icon={<IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
          iconGradient={interest.color}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Interests", href: "/interests" },
            { label: interest.title },
          ]}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {interest.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-sm rounded-lg bg-[#1f231f] text-[#8a9d86] border border-[#262b26] hover:border-[#576953]/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content Cards */}
        <div className="space-y-5 sm:space-y-6">
          {/* Long Description */}
          <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/20 transition-all duration-300">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-[#F1F7ED] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#576953] rounded-full" aria-hidden="true"></span>
                Overview
              </h2>
              <p className="text-[#d0daca] leading-relaxed text-sm sm:text-base">
                {interest.longDescription}
              </p>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/20 transition-all duration-300">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-[#F1F7ED] mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#CC8B86] rounded-full" aria-hidden="true"></span>
                What I'm Exploring
              </h2>
              <ul className="space-y-4" role="list">
                {interest.highlights.map((highlight, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 sm:gap-4 group"
                  >
                    <CheckCircle2 
                      className="w-5 h-5 text-[#576953] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" 
                      aria-hidden="true"
                    />
                    <span className="text-[#d0daca] text-sm sm:text-base leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/20 transition-all duration-300">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-[#F1F7ED] mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#6a7d65] rounded-full" aria-hidden="true"></span>
                Resources I Recommend
              </h2>
              <div className="space-y-3">
                {interest.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-[#121512] border border-[#262b26] hover:border-[#576953]/40 hover:bg-[#1a1f1a] transition-all duration-300 group focus-ring"
                  >
                    <span className="text-[#d0daca] group-hover:text-[#F1F7ED] transition-colors text-sm sm:text-base">
                      {resource.title}
                    </span>
                    <ExternalLink 
                      className="w-4 h-4 text-[#6a7d65] group-hover:text-[#576953] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" 
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
            <Link href="/interests" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Interests
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#262b26] hover:border-[#576953]/50 hover:bg-[#576953]/5 text-[#d0daca] focus-ring transition-all duration-300"
          >
            <Link href="/#interests" className="flex items-center gap-2">
              View on Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </main>
  );
}
