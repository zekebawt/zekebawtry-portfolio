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
  { category: "Technical", count: 2, color: "#576953" },
  { category: "Creative", count: 0, color: "#8a9d86" },
  { category: "Research", count: 0, color: "#8a9d86" },
  { category: "Personal", count: 0, color: "#8a9d86" },
];

export function Dashboard() {
  const dailyProgress = (dashboardData.income.todayEarned / dashboardData.income.dailyTarget) * 100;

  return (
    <section id="dashboard" className="py-32 sm:py-40 bg-[#191D19] relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
            LIVE METRICS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#F1F7ED]">GROWTH</span>
            <br />
            <span className="text-[#576953]">DASHBOARD</span>
          </h2>
        </motion.div>

        {/* Key metrics row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 mb-8"
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="bg-[#191D19] border border-[#3a4438] p-6 sm:p-8 group hover:bg-[#262b26] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <metric.icon className={`w-4 h-4 ${metric.accent ? 'text-[#576953]' : 'text-[#8a9d86]'}`} />
                <span className="text-[10px] tracking-wide-caps text-[#8a9d86]">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-bold tracking-tight-hero ${metric.accent ? 'text-[#576953]' : 'text-[#F1F7ED]'}`}>
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span className="text-xs text-[#8a9d86] tracking-wide-caps">{metric.suffix}</span>
                )}
              </div>
              {metric.extra && (
                <p className="text-xs text-[#8a9d86] mt-2">{metric.extra}</p>
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
            <TabsList className="bg-transparent border-b border-[#3a4438] rounded-none p-0 h-auto mb-8 flex justify-start gap-0">
              {[
                { value: "evolution", label: "EVOLUTION", icon: TrendingUp },
                { value: "income", label: "INCOME", icon: DollarSign },
                { value: "skills", label: "SKILLS", icon: Award },
                { value: "plan", label: "PLAN", icon: Calendar },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#576953] data-[state=active]:bg-transparent bg-transparent text-[#8a9d86] data-[state=active]:text-[#576953] px-6 py-4 text-[11px] tracking-wide-caps"
                >
                  <tab.icon className="w-3.5 h-3.5 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="evolution" className="mt-0">
              <div className="bg-[#262b26] border border-[#3a4438] p-6 sm:p-8">
                <D3EvolutionChart 
                  data={generateEvolutionData()} 
                  width={700} 
                  height={350} 
                />
                <div className="flex justify-center gap-8 mt-6 text-xs text-[#8a9d86]">
                  <span>Week 1 of continuous growth</span>
                  <span className="text-[#576953]">Skills target: 14/week</span>
                  <span className="text-[#F1F7ED]">Income target: $700/week</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="income" className="mt-0">
              <div className="bg-[#262b26] border border-[#3a4438] p-6 sm:p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3a4438" />
                      <XAxis dataKey="day" stroke="#8a9d86" fontSize={11} />
                      <YAxis stroke="#8a9d86" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#191D19', 
                          border: '1px solid #3a4438',
                          borderRadius: '0',
                          color: '#F1F7ED',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="earned" fill="#576953" radius={0} />
                      <Bar dataKey="target" fill="#3a4438" radius={0} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#576953]" />
                    <span className="text-xs text-[#8a9d86]">Earned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#3a4438] border border-[#3a4438]" />
                    <span className="text-xs text-[#8a9d86]">Target</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <div className="bg-[#262b26] border border-[#3a4438] p-6 sm:p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#3a4438" horizontal={false} />
                      <XAxis type="number" stroke="#8a9d86" fontSize={11} />
                      <YAxis dataKey="category" type="category" stroke="#8a9d86" fontSize={11} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#191D19', 
                          border: '1px solid #3a4438',
                          borderRadius: '0',
                          color: '#F1F7ED',
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
              <div className="bg-[#262b26] border border-[#3a4438] p-6 sm:p-8">
                <div className="space-y-2">
                  {evolutionStreak.map((day, index) => (
                    <motion.div 
                      key={day.day}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.03 * index }}
                      className={`flex items-center gap-4 p-4 border transition-all duration-300 ${
                        day.completed 
                          ? 'bg-[#576953]/5 border-[#576953]/20' 
                          : 'bg-[#191D19] border-[#3a4438]'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center ${
                        day.completed 
                          ? 'bg-[#576953]/10 text-[#576953]' 
                          : 'bg-[#3a4438] text-[#8a9d86]'
                      }`}>
                        {day.completed ? (
                          <Award className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{String(day.day).padStart(2, '0')}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium text-sm ${day.completed ? 'text-[#576953]' : 'text-[#F1F7ED]'}`}>
                          {day.skill}
                        </span>
                        <p className="text-xs text-[#8a9d86]">{day.surprise}</p>
                      </div>
                      {day.completed && (
                        <span className="text-xs text-[#576953] tracking-wide-caps">DONE</span>
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#576953]/20 to-transparent" />
    </section>
  );
}
