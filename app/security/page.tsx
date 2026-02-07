"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Terminal, Eye, FileCode } from "lucide-react"
import Link from "next/link"

// High-level only — no technical details until after responsible disclosure
const researchAreas = [
  {
    id: 1,
    target: "AI Gateway Security",
    focus: "Authentication & Access Control",
    status: "Research Active",
    description: "Analysis of API gateway implementations for authentication bypasses and privilege escalation vectors.",
    icon: Shield,
    color: "from-[#8a9d86] to-[#576953]",
  },
  {
    id: 2,
    target: "LLM Infrastructure",
    focus: "Input Validation & Sandboxing",
    status: "Research Active", 
    description: "Security assessment of large language model serving platforms and their isolation mechanisms.",
    icon: Terminal,
    color: "from-[#576953] to-[#3a4438]",
  },
  {
    id: 3,
    target: "Blockchain Bridges",
    focus: "Cross-Chain Message Verification",
    status: "Research Active",
    description: "Analysis of cross-chain communication protocols for consensus and verification vulnerabilities.",
    icon: Lock,
    color: "from-[#3a4438] to-[#262b26]",
  },
  {
    id: 4,
    target: "Cloud AI Services",
    focus: "Multi-Tenant Isolation",
    status: "Research Active",
    description: "Investigation of isolation boundaries in shared AI infrastructure and API security.",
    icon: Eye,
    color: "from-[#8a9d86] to-[#576953]",
  },
]

const stats = [
  { label: "Research Active", value: "✓", suffix: "" },
  { label: "Focus Area", value: "AI/ML", suffix: "" },
  { label: "Projects Reviewed", value: "5", suffix: "+" },
  { label: "Since", value: "Feb", suffix: "'26" },
]

export default function SecurityResearch() {
  return (
    <div className="min-h-screen bg-[#191D19] text-[#F1F7ED] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* Water caustics effect */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(138, 157, 134, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Sage glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8a9d86]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#576953]/20 rounded-full blur-[100px] animate-pulse delay-1000" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#262b26]/50 border border-[#3a4438] mb-6">
              <Shield className="w-4 h-4 text-[#8a9d86]" />
              <span className="text-sm text-[#8a9d86]">Security Research</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans">
              <span className="bg-gradient-to-r from-[#F1F7ED] via-[#8a9d86] to-[#576953] bg-clip-text text-transparent">
                Vulnerability Research
              </span>
            </h1>

            <p className="text-xl text-[#8a9d86] max-w-2xl mx-auto mb-8">
              Systematic security analysis of AI infrastructure through responsible disclosure.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-[#262b26]/50 border border-[#3a4438] backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-[#F1F7ED]">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-[#8a9d86]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#F1F7ED]">Research Focus</h2>
            <p className="text-[#8a9d86] max-w-2xl mx-auto">
              Areas of active investigation. Specific vulnerabilities are disclosed responsibly 
              and documented only after vendor remediation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-[#262b26]/50 border border-[#3a4438] backdrop-blur-sm overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${area.color} bg-opacity-20`}>
                      <area.icon className="w-6 h-6 text-[#F1F7ED]" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#8a9d86]/20 text-[#8a9d86]">
                      {area.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-[#F1F7ED]">{area.target}</h3>
                  <p className="text-[#8a9d86] text-sm mb-3">{area.focus}</p>
                  <p className="text-[#8a9d86]/70 text-sm">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 px-4 bg-[#262b26]/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#F1F7ED]">Responsible Disclosure</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { step: "01", title: "Discovery", desc: "Systematic code analysis" },
                { step: "02", title: "Verification", desc: "Confirm exploitability" },
                { step: "03", title: "Disclosure", desc: "Private report to vendor" },
                { step: "04", title: "Publication", desc: "After fix & permission" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-4xl font-bold text-[#3a4438] mb-4">{item.step}</div>
                  <h3 className="font-semibold mb-2 text-[#F1F7ED]">{item.title}</h3>
                  <p className="text-sm text-[#8a9d86]">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#3a4438] to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>

            <p className="text-[#8a9d86] mt-12 max-w-xl mx-auto">
              Security research isn't about finding bugs to exploit — it's about making systems safer. 
              By identifying vulnerabilities before malicious actors do, we protect users and improve software quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-[#F1F7ED]">Continuous Research</h2>
          <p className="text-[#8a9d86] max-w-xl mx-auto mb-8">
            Security research is ongoing. New findings are discovered, verified, 
            and disclosed following responsible disclosure practices.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/blog/security-research-methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8a9d86]/20 text-[#8a9d86] border border-[#8a9d86]/30 hover:bg-[#8a9d86]/30 transition-colors"
            >
              <FileCode className="w-4 h-4" />
              Read Methodology
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#262b26]/50 text-[#8a9d86] border border-[#3a4438] hover:bg-[#262b26] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
