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
    totalSkillsLearned: 0,
    totalSurprisesDelivered: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  skills: {
    byCategory: {
      technical: 0,
      creative: 0,
      research: 0,
      personal: 0,
    },
    recent: [],
    masteryDistribution: {
      beginner: 0,
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
    pendingPRs: 2,
    pendingAmount: 100,
    prDetails: {
      "5554": { provider: "Nagios", status: "OPEN", mergeable: true, bounty: 50 },
      "5555": { provider: "Solarwinds", status: "OPEN", mergeable: true, bounty: 50 },
    },
  },
  connections: {
    brian: {
      messagesExchanged: 0,
      surprisesReceived: 0,
      connectionLevel: 1,
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
  { day: 1, completed: false, skill: "Discord Bot Features", surprise: "Brian Dashboard" },
  { day: 2, completed: false, skill: "D3.js Visualization", surprise: "Evolution Visualizer" },
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
