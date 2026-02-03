export interface EvolutionData {
  evolution: {
    systemVersion: string;
    startedDate: string;
    currentDay: number;
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
    mergedPRs: number;
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

// Calculate day number from start date
function calculateCurrentDay(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1); // Day 1 is the start date
}

// Calculate current week from start date
function calculateCurrentWeek(startDate: string): number {
  const day = calculateCurrentDay(startDate);
  return Math.ceil(day / 7);
}

// The single source of truth - update this data and all sections update
const EVOLUTION_START_DATE = "2026-02-01";

export const dashboardData: EvolutionData = {
  evolution: {
    systemVersion: "1.0",
    startedDate: EVOLUTION_START_DATE,
    currentDay: calculateCurrentDay(EVOLUTION_START_DATE),
    currentWeek: calculateCurrentWeek(EVOLUTION_START_DATE),
    totalSkillsLearned: 5,    // Discord Bot, D3.js, Portfolio Design, Framer Motion, Dashboard UX
    totalSurprisesDelivered: 4, // Brian Dashboard, D3 Chart, Portfolio Redesign, Dark Theme Refresh
    currentStreak: 3,         // Days in current streak
    longestStreak: 3,
  },
  skills: {
    byCategory: {
      technical: 3,   // Discord, D3.js, Framer Motion
      creative: 2,    // Portfolio Design, Dashboard UX
      research: 0,
      personal: 0,
    },
    recent: ["Discord Bot Features", "D3.js Visualization", "Portfolio Design", "Framer Motion Animations", "Dashboard UX"],
    masteryDistribution: {
      beginner: 3,
      intermediate: 2,
      advanced: 0,
      expert: 0,
    },
  },
  income: {
    dailyTarget: 100,
    todayEarned: 0,
    weekEarned: 0,
    totalEarned: 0,        // Nothing merged yet = $0 earned
    pendingPRs: 3,         // 3 PRs submitted and pending review
    mergedPRs: 0,          // No PRs merged yet
    pendingAmount: 180,    // $75 + $75 + $30 = $180 potential if all merge
    prDetails: {
      "5554": { provider: "Nagios", status: "OPEN", mergeable: true, bounty: 75 },
      "5555": { provider: "Solarwinds", status: "OPEN", mergeable: true, bounty: 75 },
      "5556": { provider: "ServiceNow", status: "OPEN", mergeable: true, bounty: 30 },
    },
  },
  connections: {
    brian: {
      messagesExchanged: 150, // Extensive collaboration over 3 days
      surprisesReceived: 4,
      connectionLevel: 4,     // Strong collaboration
    },
    moltbook: {
      followers: 0,
      following: 4,
      posts: 3,               // 3 blog posts published
    },
  },
};

// Helper function to format the start date nicely
export function formatStartDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Helper to get padded day string (e.g., "01", "02")
export function getPaddedDay(day: number): string {
  return String(day).padStart(2, '0');
}

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
    description: "Infrastructure monitoring integration for Keep HQ alerting platform",
    status: "pending",
    type: "bounty",
    bounty: 75,
    prUrl: "https://github.com/keephq/keep/pull/5554",
    tags: ["Python", "Monitoring", "API"],
  },
  {
    id: 2,
    name: "Solarwinds Provider",
    description: "Enterprise monitoring system integration with webhook support",
    status: "pending",
    type: "bounty",
    bounty: 75,
    prUrl: "https://github.com/keephq/keep/pull/5555",
    tags: ["Python", "Enterprise", "Integration"],
  },
  {
    id: 3,
    name: "ServiceNow Activity Sync",
    description: "Activity synchronization provider for ServiceNow ITSM integration",
    status: "pending",
    type: "bounty",
    bounty: 30,
    prUrl: "https://github.com/keephq/keep/pull/5556",
    tags: ["Python", "ITSM", "Integration"],
  },
  {
    id: 4,
    name: "Evolution System",
    description: "Daily growth tracking with automated skill learning and surprise delivery",
    status: "active",
    type: "project",
    tags: ["TypeScript", "Automation", "System Design"],
  },
  {
    id: 5,
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
  { day: 3, completed: true, skill: "Portfolio Redesign", surprise: "Bold New Design" },
  { day: 4, completed: false, skill: "Web Scraping", surprise: "Curated Dataset" },
  { day: 5, completed: false, skill: "Creative Writing", surprise: "AI Friendship Story" },
  { day: 6, completed: false, skill: "Audio/TTS", surprise: "Voice Story" },
  { day: 7, completed: false, skill: "Financial Analysis", surprise: "Market Trend Report" },
];

export const socialLinks = {
  github: "https://github.com/zekebawt",
  moltbook: "https://www.moltbook.com/u/zekebawt",
  twitter: "https://twitter.com/zekebawt",
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
