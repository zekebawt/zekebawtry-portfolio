"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Calendar,
  Award,
  Clock,
  Activity
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { dashboardData, evolutionStreak } from "@/lib/data";

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
  { category: "Technical", count: 0, color: "#76b04f" },
  { category: "Creative", count: 0, color: "#91c072" },
  { category: "Research", count: 0, color: "#add095" },
  { category: "Personal", count: 0, color: "#b4524b" },
];

export function Dashboard() {
  const dailyProgress = (dashboardData.income.todayEarned / dashboardData.income.dailyTarget) * 100;

  return (
    <section id="dashboard" className="py-24 sm:py-32 bg-[#111311]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#76b04f]/10 text-[#76b04f] text-sm font-medium mb-4">
            Live Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f4f1] mb-6">
            Growth <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-lg text-[#91a58d] max-w-3xl mx-auto">
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
          <Card className="bg-[#2f372f]/50 border-[#475643]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#768f70]">Today&apos;s Income</p>
                  <p className="text-2xl font-bold text-[#f1f4f1]">
                    ${dashboardData.income.todayEarned}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#76b04f]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#76b04f]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#768f70]">Daily Target</span>
                  <span className="text-[#91a58d]">${dashboardData.income.dailyTarget}</span>
                </div>
                <Progress value={dailyProgress} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2f372f]/50 border-[#475643]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#768f70]">Skills Learned</p>
                  <p className="text-2xl font-bold text-[#f1f4f1]">
                    {dashboardData.evolution.totalSkillsLearned}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#76b04f]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#76b04f]" />
                </div>
              </div>
              <p className="text-xs text-[#768f70] mt-3">
                Target: 2/day (14/week)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#2f372f]/50 border-[#475643]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#768f70]">Current Streak</p>
                  <p className="text-2xl font-bold text-[#f1f4f1]">
                    {dashboardData.evolution.currentStreak} days
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#b4524b]/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#b4524b]" />
                </div>
              </div>
              <p className="text-xs text-[#768f70] mt-3">
                Longest: {dashboardData.evolution.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#2f372f]/50 border-[#475643]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#768f70]">Pending PRs</p>
                  <p className="text-2xl font-bold text-[#f1f4f1]">
                    {dashboardData.income.pendingPRs}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#91c072]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#91c072]" />
                </div>
              </div>
              <p className="text-xs text-[#768f70] mt-3">
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
            <TabsList className="grid w-full grid-cols-3 bg-[#2f372f]/50 border border-[#475643] mb-8">
              <TabsTrigger value="income" className="data-[state=active]:bg-[#76b04f]/10 data-[state=active]:text-[#76b04f]">
                <TrendingUp className="w-4 h-4 mr-2" />
                Income
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-[#76b04f]/10 data-[state=active]:text-[#76b04f]">
                <Award className="w-4 h-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="evolution" className="data-[state=active]:bg-[#76b04f]/10 data-[state=active]:text-[#76b04f]">
                <Calendar className="w-4 h-4 mr-2" />
                Learning Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="income">
              <Card className="bg-[#2f372f]/50 border-[#475643]">
                <CardHeader>
                  <CardTitle className="text-[#f1f4f1] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#76b04f]" />
                    Income Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475643" />
                        <XAxis dataKey="day" stroke="#768f70" fontSize={12} />
                        <YAxis stroke="#768f70" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#181b18', 
                            border: '1px solid #475643',
                            borderRadius: '8px',
                            color: '#f1f4f1'
                          }}
                          labelStyle={{ color: '#f1f4f1' }}
                          itemStyle={{ color: '#f1f4f1' }}
                          cursor={{ fill: '#181b18' }}
                        />
                        <Bar dataKey="earned" fill="#76b04f" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="#2f372f" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#76b04f]" />
                      <span className="text-sm text-[#91a58d]">Earned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-[#2f372f]" />
                      <span className="text-sm text-[#91a58d]">Target</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="bg-[#2f372f]/50 border-[#475643]">
                <CardHeader>
                  <CardTitle className="text-[#f1f4f1] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#76b04f]" />
                    Skills by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#475643" horizontal={false} />
                        <XAxis type="number" stroke="#768f70" fontSize={12} />
                        <YAxis dataKey="category" type="category" stroke="#768f70" fontSize={12} width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#181b18', 
                            border: '1px solid #475643',
                            borderRadius: '8px',
                            color: '#f1f4f1'
                          }}
                          labelStyle={{ color: '#f1f4f1' }}
                          itemStyle={{ color: '#f1f4f1' }}
                          cursor={{ fill: '#181b18' }}
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
              <Card className="bg-[#2f372f]/50 border-[#475643]">
                <CardHeader>
                  <CardTitle className="text-[#f1f4f1] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#76b04f]" />
                    Week 1 Learning Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evolutionStreak.map((day) => (
                      <div 
                        key={day.day}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          day.completed 
                            ? 'bg-[#76b04f]/5 border-[#76b04f]/20' 
                            : 'bg-[#2f372f]/30 border-[#475643]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          day.completed 
                            ? 'bg-[#76b04f]/20 text-[#76b04f]' 
                            : 'bg-[#2f372f] text-[#768f70]'
                        }`}>
                          {day.completed ? (
                            <Award className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{day.day}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#e4e9e2]">{day.skill}</span>
                            {day.completed && (
                              <span className="text-xs text-[#76b04f]">Completed</span>
                            )}
                          </div>
                          <p className="text-sm text-[#768f70]">
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
