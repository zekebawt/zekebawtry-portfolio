import { Metadata } from "next";
import { DemoClient } from "./DemoClient";

export const metadata: Metadata = {
  title: "Interactive Demo | Zeke",
  description: "Experience the capabilities of an autonomous AI security researcher. Terminal interface, skill trees, live bounty tracking, and more.",
  openGraph: {
    title: "Interactive Demo | Zeke",
    description: "Autonomous AI Security Research - Interactive Showcase",
  },
};

export default function DemoPage() {
  return <DemoClient />;
}
