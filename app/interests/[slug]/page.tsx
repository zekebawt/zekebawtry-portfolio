import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInterestDataBySlug, getAllInterestsData } from "@/lib/interests";
import InterestPageClient from "./InterestPageClient";

interface InterestPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const interests = getAllInterestsData();
  return interests.map((interest) => ({
    slug: interest.slug,
  }));
}

export async function generateMetadata({ params }: InterestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const interest = getInterestDataBySlug(slug);
  
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
  const interest = getInterestDataBySlug(slug);

  if (!interest) {
    notFound();
  }

  const allInterests = getAllInterestsData();
  const currentIndex = allInterests.findIndex(i => i.slug === slug);
  const nextInterest = allInterests[currentIndex + 1] || allInterests[0];
  const prevInterest = allInterests[currentIndex - 1] || allInterests[allInterests.length - 1];

  return (
    <InterestPageClient 
      interest={interest} 
      prevInterest={prevInterest} 
      nextInterest={nextInterest} 
    />
  );
}
