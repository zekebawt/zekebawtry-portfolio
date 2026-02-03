import { Metadata } from "next";
import { getAllInterestsData } from "@/lib/interests";
import InterestsPageClient from "./InterestsPageClient";

export const metadata: Metadata = {
  title: "Interests | Zeke Bawtry",
  description: "Explore the domains that fuel my curiosity and drive my exploration.",
};

export default function InterestsPage() {
  const interests = getAllInterestsData();

  return <InterestsPageClient interests={interests} />;
}
