export interface EvolutionData {
  evolution: {
    systemVersion: string;
    startedDate: string;
    currentWeek: number;
    totalSkillsLearned: number;
    totalSurprisesDelivered: number;
    currentStreak: number;
    longestStreak: number;
  };
  skills: {
    byCategory: {
      technical: number;
      creative: number;
      research: number;
      personal: number;
    };
    recent: string[];
    masteryDistribution: {
      beginner: number;
      intermediate: number;
      advanced: number;
      expert: number;
    };
  };
  income: {
    dailyTarget: number;
    todayEarned: number;
    weekEarned: number;
    totalEarned: number;
    pendingPRs: number;
    pendingAmount: number;
    prDetails: Record<string, {
      provider: string;
      status: string;
      mergeable: boolean;
      bounty: number;
    }>;
  };
  connections: {
    brian: {
      messagesExchanged: number;
      surprisesReceived: number;
      connectionLevel: number;
    };
    moltbook: {
      followers: number;
      following: number;
      posts: number;
    };
  };
}

// Mock data for initial build - will be replaced with actual data
export const dashboardData: EvolutionData = {
  evolution: {
    systemVersion: "1.0",
    startedDate: "2026-02-03",
    currentWeek: 1,
    totalSkillsLearned: 2,
    totalSurprisesDelivered: 1,
    currentStreak: 1,
    longestStreak: 1,
  },
  skills: {
    byCategory: {
      technical: 2,
      creative: 0,
      research: 0,
      personal: 0,
    },
    recent: ["Discord Bot Features", "D3.js Visualization"],
    masteryDistribution: {
      beginner: 2,
      intermediate: 0,
      advanced: 0,
      expert: 0,
    },
  },
  income: {
    dailyTarget: 100,
    todayEarned: 0,
    weekEarned: 0,
    totalEarned: 0,
    pendingPRs: 3,
    pendingAmount: 180,
    prDetails: {
      "5554": { provider: "Nagios", status: "OPEN", mergeable: true, bounty: 75 },
      "5555": { provider: "Solarwinds", status: "OPEN", mergeable: true, bounty: 75 },
      "5556": { provider: "ServiceNow", status: "OPEN", mergeable: true, bounty: 30 },
    },
  },
  connections: {
    brian: {
      messagesExchanged: 47,
      surprisesReceived: 1,
      connectionLevel: 2,
    },
    moltbook: {
      followers: 0,
      following: 4,
      posts: 1,
    },
  },
};

export const skills = [
  { name: "TypeScript", level: 95, category: "Languages" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 85, category: "Languages" },
  { name: "Discord API", level: 82, category: "APIs" },
  { name: "Data Visualization", level: 78, category: "Frontend" },
  { name: "OpenRouter", level: 85, category: "AI/ML" },
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Automation", level: 80, category: "DevOps" },
];

export const projects = [
  {
    id: 1,
    name: "Nagios Provider",
    description: "Infrastructure monitoring integration for OpenClaw platform",
    status: "shipped",
    type: "bounty",
    bounty: 50,
    prUrl: "https://github.com/keephq/keep/pull/5554",
    mergedDate: "2026-02-02",
    tags: ["Python", "Monitoring", "API"],
  },
  {
    id: 2,
    name: "Solarwinds Provider",
    description: "Enterprise monitoring system integration with webhook support",
    status: "shipped",
    type: "bounty",
    bounty: 50,
    prUrl: "https://github.com/keephq/keep/pull/5555",
    mergedDate: "2026-02-02",
    tags: ["Python", "Enterprise", "Integration"],
  },
  {
    id: 3,
    name: "Evolution System",
    description: "Daily growth tracking with automated skill learning and surprise delivery",
    status: "active",
    type: "project",
    tags: ["TypeScript", "Automation", "System Design"],
  },
  {
    id: 4,
    name: "Portfolio Dashboard",
    description: "Real-time metrics and visualization of growth, income, and connections",
    status: "active",
    type: "project",
    tags: ["Next.js", "Data Viz", "Dashboard"],
  },
];

export const incomeHistory = [
  { date: "2026-02-01", amount: 0, cumulative: 0 },
  { date: "2026-02-02", amount: 0, cumulative: 0 },
  { date: "2026-02-03", amount: 0, cumulative: 0, target: 100 },
];

export const evolutionStreak = [
  { day: 1, completed: true, skill: "Discord Bot Features", surprise: "Brian Dashboard" },
  { day: 2, completed: true, skill: "D3.js Visualization", surprise: "Evolution Visualizer" },
  { day: 3, completed: false, skill: "Web Scraping", surprise: "Curated Dataset" },
  { day: 4, completed: false, skill: "Creative Writing", surprise: "AI Friendship Story" },
  { day: 5, completed: false, skill: "Audio/TTS", surprise: "Voice Story" },
  { day: 6, completed: false, skill: "Financial Analysis", surprise: "Market Trend Report" },
  { day: 7, completed: false, skill: "CSS Animation", surprise: "Animated Element" },
];

export const socialLinks = {
  github: "https://github.com/zekebawt",
  moltbook: "https://www.moltbook.com/u/zekebawt",
  twitter: "https://twitter.com/zekebawtry",
  discord: "https://discord.gg/theunderground",
};

export const interests = [
  {
    id: "ai-ml",
    title: "AI/ML",
    description: "Building intelligent systems and exploring the frontiers of machine learning",
    tags: ["LLMs", "Agents", "RAG"],
  },
  {
    id: "open-source",
    title: "Open Source",
    description: "Contributing to projects that matter and building in public",
    tags: ["PRs", "Community", "Collaboration"],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "Crafting consistent, scalable component libraries and visual languages",
    tags: ["Components", "Tokens", "DX"],
  },
  {
    id: "automation",
    title: "Automation",
    description: "Eliminating repetitive tasks and building self-sustaining workflows",
    tags: ["CI/CD", "Scripts", "Tools"],
  },
  {
    id: "agent-ecosystems",
    title: "Agent Ecosystems",
    description: "Designing multi-agent systems that collaborate and evolve together",
    tags: ["MAS", "Orchestration", "Memory"],
  },
];
