"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Calendar,
  Award,
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
  { day: "D1", earned: 0, target: 100 },
  { day: "D2", earned: 0, target: 100 },
  { day: "D3", earned: 0, target: 100 },
  { day: "D4", earned: 0, target: 100 },
  { day: "D5", earned: 0, target: 100 },
  { day: "D6", earned: 0, target: 100 },
  { day: "D7", earned: 0, target: 100 },
];

const skillData = [
  { category: "Technical", count: 2, color: "#22c55e" },
  { category: "Creative", count: 0, color: "#4ade80" },
  { category: "Research", count: 0, color: "#86efac" },
  { category: "Personal", count: 0, color: "#a3a3a3" },
];

export function Dashboard() {
  const dailyProgress = (dashboardData.income.todayEarned / dashboardData.income.dailyTarget) * 100;

  return (
    <section id="dashboard" className="py-32 sm:py-40 bg-[#050505] relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-wide-caps text-[#22c55e] font-medium">
            LIVE METRICS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#f5f5f5]">GROWTH</span>
            <br />
            <span className="text-[#22c55e]">DASHBOARD</span>
          </h2>
        </motion.div>

        {/* Key metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] mb-8"
        >
          {[
            { 
              label: "TODAY'S INCOME", 
              value: `$${dashboardData.income.todayEarned}`,
              icon: DollarSign,
              accent: true
            },
            { 
              label: "SKILLS LEARNED", 
              value: dashboardData.evolution.totalSkillsLearned.toString(),
              icon: Zap,
              accent: true
            },
            { 
              label: "CURRENT STREAK", 
              value: `${dashboardData.evolution.currentStreak}`,
              icon: Activity,
              suffix: "DAYS"
            },
            { 
              label: "PENDING PRs", 
              value: dashboardData.income.pendingPRs.toString(),
              icon: TrendingUp,
              extra: `$${dashboardData.income.pendingAmount} potential`
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="bg-[#0a0a0b] p-6 sm:p-8 group hover:bg-[#111111] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <metric.icon className={`w-4 h-4 ${metric.accent ? 'text-[#22c55e]' : 'text-[#a3a3a3]'}`} />
                <span className="text-[10px] tracking-wide-caps text-[#a3a3a3]">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-bold tracking-tight-hero ${metric.accent ? 'text-[#22c55e]' : 'text-[#f5f5f5]'}`}>
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span className="text-xs text-[#a3a3a3] tracking-wide-caps">{metric.suffix}</span>
                )}
              </div>
              {metric.extra && (
                <p className="text-xs text-[#a3a3a3] mt-2">{metric.extra}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="evolution" className="w-full">
            <TabsList className="bg-transparent border-b border-[#1a1a1a] rounded-none p-0 h-auto mb-8 flex justify-start gap-0">
              {[
                { value: "evolution", label: "EVOLUTION", icon: TrendingUp },
                { value: "income", label: "INCOME", icon: DollarSign },
                { value: "skills", label: "SKILLS", icon: Award },
                { value: "plan", label: "PLAN", icon: Calendar },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#22c55e] data-[state=active]:bg-transparent bg-transparent text-[#a3a3a3] data-[state=active]:text-[#22c55e] px-6 py-4 text-[11px] tracking-wide-caps"
                >
                  <tab.icon className="w-3.5 h-3.5 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="evolution" className="mt-0">
              <div className="bg-[#111111] border border-[#1a1a1a] p-6 sm:p-8">
                <D3EvolutionChart 
                  data={generateEvolutionData()} 
                  width={700} 
                  height={350} 
                />
                <div className="flex justify-center gap-8 mt-6 text-xs text-[#a3a3a3]">
                  <span>Week 1 of continuous growth</span>
                  <span className="text-[#22c55e]">Skills target: 14/week</span>
                  <span className="text-[#f5f5f5]">Income target: $700/week</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="income" className="mt-0">
              <div className="bg-[#111111] border border-[#1a1a1a] p-6 sm:p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                      <XAxis dataKey="day" stroke="#a3a3a3" fontSize={11} />
                      <YAxis stroke="#a3a3a3" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0a0a0b', 
                          border: '1px solid #1a1a1a',
                          borderRadius: '0',
                          color: '#f5f5f5',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="earned" fill="#22c55e" radius={0} />
                      <Bar dataKey="target" fill="#1a1a1a" radius={0} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#22c55e]" />
                    <span className="text-xs text-[#a3a3a3]">Earned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1a1a1a] border border-[#262626]" />
                    <span className="text-xs text-[#a3a3a3]">Target</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <div className="bg-[#111111] border border-[#1a1a1a] p-6 sm:p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
                      <XAxis type="number" stroke="#a3a3a3" fontSize={11} />
                      <YAxis dataKey="category" type="category" stroke="#a3a3a3" fontSize={11} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0a0a0b', 
                          border: '1px solid #1a1a1a',
                          borderRadius: '0',
                          color: '#f5f5f5',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="count" radius={0}>
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plan" className="mt-0">
              <div className="bg-[#111111] border border-[#1a1a1a] p-6 sm:p-8">
                <div className="space-y-2">
                  {evolutionStreak.map((day, index) => (
                    <motion.div 
                      key={day.day}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.03 * index }}
                      className={`flex items-center gap-4 p-4 border transition-all duration-300 ${
                        day.completed 
                          ? 'bg-[#22c55e]/5 border-[#22c55e]/20' 
                          : 'bg-[#0a0a0b] border-[#1a1a1a]'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center ${
                        day.completed 
                          ? 'bg-[#22c55e]/10 text-[#22c55e]' 
                          : 'bg-[#1a1a1a] text-[#a3a3a3]'
                      }`}>
                        {day.completed ? (
                          <Award className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{String(day.day).padStart(2, '0')}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium text-sm ${day.completed ? 'text-[#22c55e]' : 'text-[#f5f5f5]'}`}>
                          {day.skill}
                        </span>
                        <p className="text-xs text-[#a3a3a3]">{day.surprise}</p>
                      </div>
                      {day.completed && (
                        <span className="text-xs text-[#22c55e] tracking-wide-caps">DONE</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />
    </section>
  );
}
