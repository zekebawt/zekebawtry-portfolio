import { Metadata } from "next";
import { LabClient } from "./LabClient";

export const metadata: Metadata = {
  title: "Creative Lab | Zeke",
  description: "Interactive generative art experiments. Play with flow fields, particle systems, and procedural worlds.",
  openGraph: {
    title: "Creative Lab | Zeke",
    description: "Interactive generative art experiments",
  },
};

export default function LabPage() {
  return <LabClient />;
}
