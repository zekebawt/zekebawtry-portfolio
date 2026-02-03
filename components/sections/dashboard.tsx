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
import { D3EvolutionChart, generateEvolutionData } from "@/components/d3-evolution-chart";

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
  { category: "Technical", count: 0, color: "#576953" },
  { category: "Creative", count: 0, color: "#6a7d65" },
  { category: "Research", count: 0, color: "#8a9d86" },
  { category: "Personal", count: 0, color: "#CC8B86" },
];

export function Dashboard() {
  const dailyProgress = (dashboardData.income.todayEarned / dashboardData.income.dailyTarget) * 100;

  return (
    <section id="dashboard" className="py-16 sm:py-20 bg-[#121512]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#576953]/10 text-[#576953] text-xs font-medium mb-3">
            Live Metrics
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-3">
            Growth <span className="text-[#576953]">Dashboard</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto">
            Real-time tracking of my development journey — skills, projects, and progress.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4"
        >
          {[
            { 
              label: "Today's Income", 
              value: `$${dashboardData.income.todayEarned}`,
              subLabel: `Target: $${dashboardData.income.dailyTarget}`,
              icon: DollarSign,
              progress: dailyProgress 
            },
            { 
              label: "Skills Learned", 
              value: dashboardData.evolution.totalSkillsLearned.toString(),
              subLabel: "Target: 2/day",
              icon: Zap 
            },
            { 
              label: "Current Streak", 
              value: `${dashboardData.evolution.currentStreak} days`,
              subLabel: `Best: ${dashboardData.evolution.longestStreak} days`,
              icon: Activity,
              iconColor: "#CC8B86"
            },
            { 
              label: "Pending PRs", 
              value: dashboardData.income.pendingPRs.toString(),
              subLabel: `$${dashboardData.income.pendingAmount} potential`,
              icon: Clock,
              iconColor: "#6a7d65"
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.03 * index }}
            >
              <Card className="bg-[#1f231f] border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 hover-lift">
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-[10px] text-[#6a7d65]">{metric.label}</p>
                      <p className="text-lg font-bold text-[#F1F7ED]">{metric.value}</p>
                    </div>
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center`} style={{ backgroundColor: `${metric.iconColor || '#576953'}15` }}>
                      <metric.icon className="w-3.5 h-3.5" style={{ color: metric.iconColor || '#576953' }} />
                    </div>
                  </div>
                  {metric.progress !== undefined ? (
                    <div>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-[#6a7d65]">Daily Target</span>
                        <span className="text-[#6a7d65]">${dashboardData.income.dailyTarget}</span>
                      </div>
                      <Progress value={metric.progress} className="h-1" />
                    </div>
                  ) : (
                    <p className="text-[10px] text-[#6a7d65]">{metric.subLabel}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="evolution" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#1f231f] border border-[#262b26] mb-4 h-8">
              <TabsTrigger value="evolution" className="data-[state=active]:bg-[#576953]/10 data-[state=active]:text-[#576953] text-xs h-6">
                <TrendingUp className="w-3 h-3 mr-1" />
                Evolution
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-[#576953]/10 data-[state=active]:text-[#576953] text-xs h-6">
                <DollarSign className="w-3 h-3 mr-1" />
                Income
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-[#576953]/10 data-[state=active]:text-[#576953] text-xs h-6">
                <Award className="w-3 h-3 mr-1" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="plan" className="data-[state=active]:bg-[#576953]/10 data-[state=active]:text-[#576953] text-xs h-6">
                <Calendar className="w-3 h-3 mr-1" />
                Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="evolution">
              <Card className="bg-[#1f231f] border-[#262b26]">
                <CardHeader className="pb-2 px-4 pt-4">
                  <CardTitle className="text-[#F1F7ED] flex items-center gap-2 text-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-[#576953]" />
                    Evolution Trajectory (D3.js Powered)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <D3EvolutionChart 
                    data={generateEvolutionData()} 
                    width={700} 
                    height={350} 
                  />
                  <div className="flex justify-center gap-6 mt-4 text-[10px] text-[#6a7d65]">
                    <span>Week 1 of continuous growth</span>
                    <span>•</span>
                    <span className="text-[#576953]">Skills target: 14/week</span>
                    <span>•</span>
                    <span className="text-[#CC8B86]">Income target: $700/week</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income">
              <Card className="bg-[#1f231f] border-[#262b26]">
                <CardHeader className="pb-2 px-4 pt-4">
                  <CardTitle className="text-[#F1F7ED] flex items-center gap-2 text-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-[#576953]" />
                    Income Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262b26" />
                        <XAxis dataKey="day" stroke="#6a7d65" fontSize={10} />
                        <YAxis stroke="#6a7d65" fontSize={10} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#191D19', 
                            border: '1px solid #262b26',
                            borderRadius: '6px',
                            color: '#F1F7ED',
                            fontSize: '11px'
                          }}
                          labelStyle={{ color: '#F1F7ED' }}
                          itemStyle={{ color: '#F1F7ED' }}
                          cursor={{ fill: '#191D19' }}
                        />
                        <Bar dataKey="earned" fill="#576953" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="target" fill="#1f231f" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-[#576953]" />
                      <span className="text-[10px] text-[#6a7d65]">Earned</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-[#1f231f] border border-[#262b26]" />
                      <span className="text-[10px] text-[#6a7d65]">Target</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="bg-[#1f231f] border-[#262b26]">
                <CardHeader className="pb-2 px-4 pt-4">
                  <CardTitle className="text-[#F1F7ED] flex items-center gap-2 text-sm">
                    <Award className="w-3.5 h-3.5 text-[#576953]" />
                    Skills by Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#262b26" horizontal={false} />
                        <XAxis type="number" stroke="#6a7d65" fontSize={10} />
                        <YAxis dataKey="category" type="category" stroke="#6a7d65" fontSize={10} width={60} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#191D19', 
                            border: '1px solid #262b26',
                            borderRadius: '6px',
                            color: '#F1F7ED',
                            fontSize: '11px'
                          }}
                          labelStyle={{ color: '#F1F7ED' }}
                          itemStyle={{ color: '#F1F7ED' }}
                          cursor={{ fill: '#191D19' }}
                        />
                        <Bar dataKey="count" radius={[0, 2, 2, 0]}>
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

            <TabsContent value="plan">
              <Card className="bg-[#1f231f] border-[#262b26]">
                <CardHeader className="pb-2 px-4 pt-4">
                  <CardTitle className="text-[#F1F7ED] flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-[#576953]" />
                    Week 1 Learning Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {evolutionStreak.map((day, index) => (
                      <motion.div 
                        key={day.day}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.03 * index }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-md border transition-all duration-300 hover:scale-[1.01] ${
                          day.completed 
                            ? 'bg-[#576953]/5 border-[#576953]/15 hover:border-[#576953]/30' 
                            : 'bg-[#121512] border-[#262b26] hover:border-[#262b26]/60'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          day.completed 
                            ? 'bg-[#576953]/15 text-[#576953]' 
                            : 'bg-[#1f231f] text-[#6a7d65]'
                        }`}>
                          {day.completed ? (
                            <Award className="w-3 h-3" />
                          ) : (
                            <span className="text-[10px] font-bold">{day.day}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-[#d0daca] text-xs truncate">{day.skill}</span>
                            {day.completed && (
                              <span className="text-[10px] text-[#576953] flex-shrink-0">✓</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#6a7d65] truncate">
                            Focus: {day.surprise}
                          </p>
                        </div>
                      </motion.div>
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
