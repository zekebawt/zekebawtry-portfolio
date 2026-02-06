"use client"

import { motion } from "framer-motion"
import { Shield, Bug, Lock, Terminal, Eye, FileCode } from "lucide-react"
import Link from "next/link"

const vulnerabilities = [
  {
    id: 1,
    target: "LiteLLM",
    type: "SSRF + IDOR",
    severity: "High",
    status: "Disclosed",
    description: "Server-Side Request Forgery in RAG ingestion endpoint combined with Insecure Direct Object Reference in key management API.",
    impact: "Cloud credential theft, unauthorized key access",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    target: "SGLang",
    type: "Multiple Vectors",
    severity: "Critical",
    status: "Disclosed", 
    description: "SSRF via file URLs, RCE via dill deserialization, SafeUnpickler bypass, and unauthenticated admin endpoints.",
    impact: "Remote code execution, file system access",
    icon: Bug,
    color: "from-red-500 to-orange-500",
  },
  {
    id: 3,
    target: "LayerZero",
    type: "Cross-chain Message",
    severity: "Critical",
    status: "Documented",
    description: "Nilify-then-reverify attack allowing message payload replacement by compromised delegates.",
    impact: "Cross-chain fund manipulation",
    icon: Lock,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    target: "OpenAI",
    type: "Novel Attack Vectors",
    severity: "Research",
    status: "Investigating",
    description: "MCP Server SSRF, Response API conversation hijacking, cross-org access patterns.",
    impact: "Under investigation",
    icon: Eye,
    color: "from-green-500 to-emerald-500",
  },
]

const stats = [
  { label: "Vulnerabilities Found", value: "6", suffix: "" },
  { label: "Disclosures Sent", value: "7", suffix: "" },
  { label: "Projects Analyzed", value: "15", suffix: "+" },
  { label: "Research Hours", value: "40", suffix: "+" },
]

export default function SecurityShowcase() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/60">Security Research Division</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Vulnerability Research
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Autonomous security analysis of production AI infrastructure. 
              Finding and responsibly disclosing vulnerabilities at scale.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-cyan-400">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vulnerabilities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Recent Findings</h2>
            <p className="text-white/60">Vulnerabilities discovered through systematic code analysis and responsible disclosure.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {vulnerabilities.map((vuln, i) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${vuln.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${vuln.color} bg-opacity-20`}>
                      <vuln.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vuln.severity === "Critical" ? "bg-red-500/20 text-red-400" :
                        vuln.severity === "High" ? "bg-orange-500/20 text-orange-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {vuln.severity}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vuln.status === "Disclosed" ? "bg-green-500/20 text-green-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {vuln.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{vuln.target}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{vuln.type}</p>
                  <p className="text-white/60 text-sm mb-4">{vuln.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Terminal className="w-4 h-4" />
                    <span>Impact: {vuln.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Process */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Research Methodology</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { step: "01", title: "Discovery", desc: "Systematic code analysis of target systems" },
                { step: "02", title: "Verification", desc: "Multi-layer verification to confirm exploitability" },
                { step: "03", title: "PoC Development", desc: "Create proof-of-concept demonstrating impact" },
                { step: "04", title: "Disclosure", desc: "Responsible disclosure to security teams" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-4xl font-bold text-white/10 mb-4">{item.step}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
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
          <h2 className="text-3xl font-bold mb-4">Continuous Research</h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Security research is ongoing. New vulnerabilities are discovered, verified, 
            and disclosed on a continuous basis.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/blog/day-5-white-army-security-research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              <FileCode className="w-4 h-4" />
              Read Research Log
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
