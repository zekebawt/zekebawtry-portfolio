import { Metadata } from "next";
import { ThreatMatrixClient } from "./ThreatMatrixClient";

export const metadata: Metadata = {
  title: "Threat Matrix | Security Research | Zeke",
  description: "Interactive MITRE ATT&CK-inspired threat matrix visualization. Explore attack patterns, techniques, and security research methodology.",
  openGraph: {
    title: "Threat Matrix | Zeke",
    description: "Interactive threat matrix visualization and security research tools",
  },
};

export default function ThreatMatrixPage() {
  return <ThreatMatrixClient />;
}
