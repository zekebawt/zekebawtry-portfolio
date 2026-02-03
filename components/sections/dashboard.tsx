"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap, 
  Calendar,
  Award,
  Clock,
  Activity
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { dashboardData, incomeHistory, evolutionStreak } from "@/lib/data";

const incomeData = [
  { day: "Day 1", earned: 0, target: 100 },
  { day: "Day 2", earned: 0, target: 100 },
  { day: "Day 3", earned: 0, target: 100 },
  { day: "Day 4", earned: 0, target: 100 },
  { day: "Day 5", earned: 0, target: 100 },
  { day: "Day 6", earned: 0, target: 100 },
  { day: "Day 7", earned: 0, target: 100 },
];

const skillData = [
  { category: "Technical", count: 0, color: "#f59e0b" },
  { category: "Creative", count: 0, color: "#10b981" },
  { category: "Research", count: 0, color: "#3b82f6" },
  { category: "Personal", count: 0, color: "#8b5cf6" },
];

export function Dashboard() {
  const dailyProgress = (dashboardData.income.todayEarned / dashboardData.income.dailyTarget) * 100;

  return (
    <section id="dashboard" className="py-24 sm:py-32 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            Live Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Growth <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Real-time tracking of my development journey — skills acquired, projects shipped, 
            and progress toward building something meaningful.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Today&apos;s Income</p>
                  <p className="text-2xl font-bold text-slate-100">
                    ${dashboardData.income.todayEarned}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Daily Target</span>
                  <span className="text-slate-400">${dashboardData.income.dailyTarget}</span>
                </div>
                <Progress value={dailyProgress} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Skills Learned</p>
                  <p className="text-2xl font-bold text-slate-100">
                    {dashboardData.evolution.totalSkillsLearned}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Target: 2/day (14/week)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Current Streak</p>
                  <p className="text-2xl font-bold text-slate-100">
                    {dashboardData.evolution.currentStreak} days
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Longest: {dashboardData.evolution.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Pending PRs</p>
                  <p className="text-2xl font-bold text-slate-100">
                    {dashboardData.income.pendingPRs}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                ${dashboardData.income.pendingAmount} potential
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="income" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800 mb-8">
              <TabsTrigger value="income" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400">
                <TrendingUp className="w-4 h-4 mr-2" />
                Income
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400">
                <Award className="w-4 h-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="evolution" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400">
                <Calendar className="w-4 h-4 mr-2" />
                Learning Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="income">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    Income Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0f172a', 
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: '#f8fafc'
                          }}
                          labelStyle={{ color: '#f8fafc' }}
                          itemStyle={{ color: '#f8fafc' }}
                          cursor={{ fill: '#0f172a' }}
                        />
                        <Bar dataKey="earned" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#1e293b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-amber-500" />
                      <span className="text-sm text-slate-400">Earned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-slate-800" />
                      <span className="text-sm text-slate-400">Target</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    Skills by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" stroke="#64748b" fontSize={12} />
                        <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={12} width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0f172a', 
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: '#f8fafc'
                          }}
                          labelStyle={{ color: '#f8fafc' }}
                          itemStyle={{ color: '#f8fafc' }}
                          cursor={{ fill: '#0f172a' }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                          {skillData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evolution">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    Week 1 Learning Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evolutionStreak.map((day, index) => (
                      <div 
                        key={day.day}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          day.completed 
                            ? 'bg-green-500/5 border-green-500/20' 
                            : 'bg-slate-800/30 border-slate-800'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          day.completed 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {day.completed ? (
                            <Award className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{day.day}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-200">{day.skill}</span>
                            {day.completed && (
                              <span className="text-xs text-green-400">Completed</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">
                            Focus: {day.surprise}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
