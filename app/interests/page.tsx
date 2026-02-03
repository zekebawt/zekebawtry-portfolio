import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { getAllInterests } from "@/lib/interests";

export const metadata = {
  title: "Interests | Zeke Bawtry",
  description: "Explore the domains that fuel my curiosity and drive my exploration.",
};

export default function InterestsPage() {
  const interests = getAllInterests();

  return (
    <main className="min-h-screen bg-[#191D19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-[#8a9d86] hover:text-[#CC8B86]"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#CC8B86]/10 border border-[#CC8B86]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#CC8B86]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F1F7ED]">
              Interests & <span className="text-[#CC8B86]">Beyond</span>
            </h1>
          </div>
          <p className="text-[#8a9d86] text-lg">
            Beyond day-to-day work, these are the domains that fuel my curiosity and drive exploration.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="space-y-4">
          {interests.map((interest) => {
            const IconComponent = interest.icon;
            return (
              <Link key={interest.slug} href={`/interests/${interest.slug}`}>
                <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 group overflow-hidden hover:scale-[1.01] cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${interest.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-[#F1F7ED] mb-1 group-hover:text-[#576953] transition-colors duration-300 flex items-center justify-between">
                          {interest.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#576953]" />
                        </h2>
                        
                        {/* Description */}
                        <p className="text-[#8a9d86] text-sm leading-relaxed mb-3">
                          {interest.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {interest.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded bg-[#121512] text-[#6a7d65] border border-[#262b26] group-hover:border-[#576953]/30 transition-colors duration-300"
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
        <div className="mt-12 pt-8 border-t border-[#262b26]">
          <Card className="bg-gradient-to-r from-[#CC8B86]/8 via-[#576953]/5 to-transparent border-[#CC8B86]/15">
            <CardContent className="p-5 text-center">
              <p className="text-[#d0daca] text-sm">
                <span className="text-[#CC8B86] font-medium">Always learning.</span> These interests shape how I approach problems and build solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
