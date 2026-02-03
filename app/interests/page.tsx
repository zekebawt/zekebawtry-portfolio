import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Sparkles, ArrowRight } from "lucide-react";
import { getAllInterests } from "@/lib/interests";

export const metadata = {
  title: "Interests | Zeke Bawtry",
  description: "Explore the domains that fuel my curiosity and drive my exploration.",
};

export default function InterestsPage() {
  const interests = getAllInterests();

  return (
    <main className="min-h-screen bg-[#191D19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <PageHeader
          title="Interests &"
          titleAccent="Beyond"
          subtitle="Beyond day-to-day work, these are the domains that fuel my curiosity and drive exploration."
          backHref="/"
          backLabel="Back to Home"
          icon={<Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
          iconGradient="from-[#CC8B86] to-[#d9a39f]"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Interests" },
          ]}
        />

        {/* Interests Grid */}
        <div className="space-y-4 sm:space-y-5">
          {interests.map((interest, index) => {
            const IconComponent = interest.icon;
            return (
              <Link 
                key={interest.slug} 
                href={`/interests/${interest.slug}`}
                className="block focus-ring rounded-xl"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/40 transition-all duration-300 group overflow-hidden hover:scale-[1.01] hover:shadow-lg hover:shadow-[#576953]/5 cursor-pointer animate-fade-in-up">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon */}
                      <div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                        aria-hidden="true"
                      >
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-semibold text-[#F1F7ED] mb-1.5 group-hover:text-[#576953] transition-colors duration-300 flex items-center justify-between gap-2">
                          <span>{interest.title}</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[#576953] flex-shrink-0" />
                        </h2>
                        
                        {/* Description */}
                        <p className="text-[#8a9d86] text-sm sm:text-base leading-relaxed mb-3">
                          {interest.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {interest.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs sm:text-sm rounded-md bg-[#121512] text-[#6a7d65] border border-[#262b26] group-hover:border-[#576953]/30 group-hover:text-[#8a9d86] transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#262b26]">
          <Card className="bg-gradient-to-r from-[#CC8B86]/8 via-[#576953]/5 to-transparent border-[#CC8B86]/15 hover-glow transition-all duration-300">
            <CardContent className="p-5 sm:p-6 text-center">
              <p className="text-[#d0daca] text-sm sm:text-base">
                <span className="text-[#CC8B86] font-medium">Always learning.</span>{" "}
                These interests shape how I approach problems and build solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
