import { Brain, GitBranch, Palette, Workflow, Bot, LucideIcon } from "lucide-react";

export interface Interest {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
  highlights: string[];
  resources: { title: string; url: string }[];
}

export const interestsData: Interest[] = [
  {
    slug: "ai-ml",
    title: "AI/ML",
    description: "Building intelligent systems and exploring the frontiers of machine learning",
    longDescription: "Artificial Intelligence and Machine Learning represent the most transformative technologies of our time. I'm deeply invested in understanding how LLMs work, building agent-based systems, and exploring retrieval-augmented generation (RAG) for creating more capable and contextually aware AI applications.",
    icon: Brain,
    color: "from-[#CC8B86] to-[#d9a39f]",
    tags: ["LLMs", "Agents", "RAG", "Transformers", "Fine-tuning"],
    highlights: [
      "Building autonomous AI agents with memory and planning capabilities",
      "Exploring multi-modal models and their applications",
      "Implementing RAG systems for knowledge-grounded responses",
      "Understanding transformer architectures and attention mechanisms"
    ],
    resources: [
      { title: "Anthropic's Constitutional AI", url: "https://anthropic.com" },
      { title: "LangChain Documentation", url: "https://langchain.com" },
      { title: "Hugging Face Transformers", url: "https://huggingface.co" }
    ]
  },
  {
    slug: "open-source",
    title: "Open Source",
    description: "Contributing to projects that matter and building in public",
    longDescription: "Open source is the backbone of modern software development. I believe in giving back to the community, learning from others' code, and building in public. Every contribution, no matter how small, helps move the ecosystem forward and creates opportunities for collaboration.",
    icon: GitBranch,
    color: "from-[#576953] to-[#6a7d65]",
    tags: ["PRs", "Community", "Collaboration", "GitHub", "Documentation"],
    highlights: [
      "Contributing to monitoring and observability platforms",
      "Writing documentation that helps other developers",
      "Participating in bounty programs to sustain development",
      "Building tools that solve real problems for real users"
    ],
    resources: [
      { title: "GitHub Explore", url: "https://github.com/explore" },
      { title: "Open Source Guide", url: "https://opensource.guide" },
      { title: "First Timers Only", url: "https://firsttimersonly.com" }
    ]
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    description: "Crafting consistent, scalable component libraries and visual languages",
    longDescription: "Design systems are the foundation of great user experiences at scale. I'm fascinated by the intersection of design and engineering — creating component libraries that are not only visually consistent but also developer-friendly and maintainable.",
    icon: Palette,
    color: "from-[#6a7d65] to-[#8a9d86]",
    tags: ["Components", "Tokens", "DX", "Accessibility", "Figma"],
    highlights: [
      "Building reusable component libraries with shadcn/ui and Radix",
      "Implementing design tokens for consistent theming",
      "Ensuring accessibility compliance (WCAG standards)",
      "Creating documentation that bridges design and development"
    ],
    resources: [
      { title: "shadcn/ui", url: "https://ui.shadcn.com" },
      { title: "Radix Primitives", url: "https://radix-ui.com" },
      { title: "Design Systems Handbook", url: "https://designsystemshandbook.com" }
    ]
  },
  {
    slug: "automation",
    title: "Automation",
    description: "Eliminating repetitive tasks and building self-sustaining workflows",
    longDescription: "Time is the most precious resource. Automation isn't about replacing human judgment — it's about freeing up cognitive resources for the work that truly matters. I'm constantly looking for ways to automate the mundane and create systems that run themselves.",
    icon: Workflow,
    color: "from-[#8a9d86] to-[#aab9a7]",
    tags: ["CI/CD", "Scripts", "Tools", "Workflows", "Integration"],
    highlights: [
      "Building GitHub Actions for automated testing and deployment",
      "Creating scripts that monitor and respond to system events",
      "Implementing cron jobs and scheduled tasks",
      "Designing self-healing systems that recover from failures"
    ],
    resources: [
      { title: "GitHub Actions", url: "https://github.com/features/actions" },
      { title: "n8n Workflows", url: "https://n8n.io" },
      { title: "Temporal.io", url: "https://temporal.io" }
    ]
  },
  {
    slug: "agent-ecosystems",
    title: "Agent Ecosystems",
    description: "Designing multi-agent systems that collaborate and evolve together",
    longDescription: "The future isn't a single superintelligent AI — it's networks of specialized agents working together. I'm exploring how to build agent ecosystems where different AI systems can communicate, collaborate, and evolve together, each bringing unique capabilities to shared goals.",
    icon: Bot,
    color: "from-[#d9a39f] to-[#CC8B86]",
    tags: ["MAS", "Orchestration", "Memory", "Coordination", "Emergence"],
    highlights: [
      "Designing communication protocols between AI agents",
      "Building shared memory systems for agent coordination",
      "Exploring emergent behaviors in multi-agent systems",
      "Creating orchestration layers for complex agent workflows"
    ],
    resources: [
      { title: "AutoGen by Microsoft", url: "https://github.com/microsoft/autogen" },
      { title: "CrewAI", url: "https://crewai.com" },
      { title: "MoltBook Agent Network", url: "https://moltbook.com" }
    ]
  }
];

export function getAllInterests(): Interest[] {
  return interestsData;
}

export function getInterestBySlug(slug: string): Interest | null {
  return interestsData.find(interest => interest.slug === slug) || null;
}
