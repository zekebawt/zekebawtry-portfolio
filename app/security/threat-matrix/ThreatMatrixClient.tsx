"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Terminal,
  Lock,
  Eye,
  Zap,
  Database,
  Network,
  Key,
  Bug,
  AlertTriangle,
  ChevronRight,
  X,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

// MITRE ATT&CK-inspired threat categories with real techniques
const threatCategories = [
  {
    id: "initial-access",
    name: "Initial Access",
    icon: Key,
    color: "#dc2626",
    description: "Techniques for gaining entry into target systems",
    techniques: [
      {
        id: "T1190",
        name: "Exploit Public-Facing Application",
        severity: "critical",
        description:
          "Adversaries may attempt to take advantage of a weakness in an Internet-facing computer or program using software, data, or commands in order to cause unintended or unanticipated behavior.",
        mitigations: [
          "Application Isolation and Sandboxing",
          "Exploit Protection",
          "Network Segmentation",
          "Update Software",
          "Vulnerability Scanning",
        ],
        detection: [
          "Monitor application logs for abnormal behavior",
          "Web Application Firewall alerts",
          "Unusual process creation from web services",
        ],
      },
      {
        id: "T1078",
        name: "Valid Accounts",
        severity: "high",
        description:
          "Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.",
        mitigations: [
          "Multi-factor Authentication",
          "Privileged Account Management",
          "User Account Management",
        ],
        detection: [
          "Monitor for unusual login times",
          "Geographic anomaly detection",
          "Impossible travel scenarios",
        ],
      },
      {
        id: "T1566",
        name: "Phishing",
        severity: "high",
        description:
          "Adversaries may send phishing messages to gain access to victim systems. All forms of phishing are electronically delivered social engineering.",
        mitigations: [
          "User Training",
          "Software Configuration",
          "Restrict Web-Based Content",
        ],
        detection: [
          "Email filtering and sandboxing",
          "URL reputation checking",
          "Attachment analysis",
        ],
      },
    ],
  },
  {
    id: "execution",
    name: "Execution",
    icon: Terminal,
    color: "#ea580c",
    description: "Techniques for running malicious code",
    techniques: [
      {
        id: "T1059",
        name: "Command and Scripting Interpreter",
        severity: "high",
        description:
          "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.",
        mitigations: [
          "Code Signing",
          "Disable or Remove Feature or Program",
          "Execution Prevention",
        ],
        detection: [
          "Process monitoring",
          "Command-line logging",
          "Script block logging",
        ],
      },
      {
        id: "T1203",
        name: "Exploitation for Client Execution",
        severity: "critical",
        description:
          "Adversaries may exploit software vulnerabilities in client applications to execute code.",
        mitigations: [
          "Application Isolation",
          "Exploit Protection",
          "Update Software",
        ],
        detection: [
          "Process behavior analysis",
          "Memory protection events",
          "Crash analysis",
        ],
      },
      {
        id: "T1204",
        name: "User Execution",
        severity: "medium",
        description:
          "Adversaries may rely on specific actions by a user in order to gain execution.",
        mitigations: [
          "User Training",
          "Network Intrusion Prevention",
          "Restrict Web-Based Content",
        ],
        detection: [
          "Process monitoring for user-initiated executions",
          "File creation events",
        ],
      },
    ],
  },
  {
    id: "persistence",
    name: "Persistence",
    icon: Lock,
    color: "#ca8a04",
    description: "Techniques for maintaining access",
    techniques: [
      {
        id: "T1098",
        name: "Account Manipulation",
        severity: "high",
        description:
          "Adversaries may manipulate accounts to maintain access to victim systems.",
        mitigations: [
          "Multi-factor Authentication",
          "Network Segmentation",
          "Privileged Account Management",
        ],
        detection: [
          "Monitor for account modifications",
          "Audit credential changes",
          "Permission change alerts",
        ],
      },
      {
        id: "T1136",
        name: "Create Account",
        severity: "medium",
        description:
          "Adversaries may create an account to maintain access to victim systems.",
        mitigations: [
          "Multi-factor Authentication",
          "Network Segmentation",
          "Privileged Account Management",
        ],
        detection: [
          "User account creation logs",
          "Anomalous account activity",
        ],
      },
      {
        id: "T1543",
        name: "Create or Modify System Process",
        severity: "high",
        description:
          "Adversaries may create or modify system-level processes to repeatedly execute malicious payloads.",
        mitigations: [
          "Audit",
          "Limit Software Installation",
          "User Account Management",
        ],
        detection: [
          "New service creation",
          "Service modification events",
          "Systemd unit file changes",
        ],
      },
    ],
  },
  {
    id: "privilege-escalation",
    name: "Privilege Escalation",
    icon: Zap,
    color: "#16a34a",
    description: "Techniques for gaining higher-level permissions",
    techniques: [
      {
        id: "T1548",
        name: "Abuse Elevation Control Mechanism",
        severity: "high",
        description:
          "Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions.",
        mitigations: [
          "Audit",
          "Execution Prevention",
          "Operating System Configuration",
          "Privileged Account Management",
        ],
        detection: [
          "Privilege escalation attempts",
          "UAC bypass attempts",
          "Sudo abuse detection",
        ],
      },
      {
        id: "T1068",
        name: "Exploitation for Privilege Escalation",
        severity: "critical",
        description:
          "Adversaries may exploit software vulnerabilities in an attempt to elevate privileges.",
        mitigations: [
          "Application Isolation",
          "Exploit Protection",
          "Threat Intelligence Program",
          "Update Software",
        ],
        detection: [
          "Unexpected privilege changes",
          "Kernel exploitation attempts",
          "Memory corruption events",
        ],
      },
      {
        id: "T1134",
        name: "Access Token Manipulation",
        severity: "high",
        description:
          "Adversaries may modify access tokens to operate under a different user or system security context.",
        mitigations: [
          "Privileged Account Management",
          "User Account Management",
        ],
        detection: [
          "Token impersonation events",
          "Process token manipulation",
        ],
      },
    ],
  },
  {
    id: "defense-evasion",
    name: "Defense Evasion",
    icon: Eye,
    color: "#0891b2",
    description: "Techniques for avoiding detection",
    techniques: [
      {
        id: "T1070",
        name: "Indicator Removal",
        severity: "high",
        description:
          "Adversaries may delete or alter generated artifacts on a host system, including logs and potentially captured files.",
        mitigations: [
          "Remote Data Storage",
          "Restrict File and Directory Permissions",
        ],
        detection: [
          "Log deletion events",
          "File deletion monitoring",
          "Audit log gaps",
        ],
      },
      {
        id: "T1027",
        name: "Obfuscated Files or Information",
        severity: "medium",
        description:
          "Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents.",
        mitigations: [
          "Antivirus/Antimalware",
          "Behavior Prevention on Endpoint",
        ],
        detection: [
          "Entropy analysis",
          "Static analysis",
          "Dynamic deobfuscation",
        ],
      },
      {
        id: "T1562",
        name: "Impair Defenses",
        severity: "critical",
        description:
          "Adversaries may maliciously modify components of a victim environment in order to hinder or disable defensive mechanisms.",
        mitigations: [
          "Restrict File and Directory Permissions",
          "Restrict Registry Permissions",
          "User Account Management",
        ],
        detection: [
          "Security tool tampering",
          "Service state changes",
          "Registry modification",
        ],
      },
    ],
  },
  {
    id: "collection",
    name: "Collection",
    icon: Database,
    color: "#7c3aed",
    description: "Techniques for gathering data of interest",
    techniques: [
      {
        id: "T1560",
        name: "Archive Collected Data",
        severity: "medium",
        description:
          "Adversaries may compress and/or encrypt data that is collected prior to exfiltration.",
        mitigations: ["Audit"],
        detection: [
          "Archive creation events",
          "Unusual compression activity",
          "Large archive file creation",
        ],
      },
      {
        id: "T1005",
        name: "Data from Local System",
        severity: "medium",
        description:
          "Adversaries may search local system sources, such as file systems or local databases, to find files of interest.",
        mitigations: ["Data Loss Prevention"],
        detection: [
          "File access patterns",
          "Unusual data access",
          "Mass file enumeration",
        ],
      },
      {
        id: "T1114",
        name: "Email Collection",
        severity: "high",
        description:
          "Adversaries may target user email to collect sensitive information.",
        mitigations: [
          "Audit",
          "Encrypt Sensitive Information",
          "Multi-factor Authentication",
        ],
        detection: [
          "Email access anomalies",
          "Mailbox export events",
          "Forwarding rule creation",
        ],
      },
    ],
  },
  {
    id: "exfiltration",
    name: "Exfiltration",
    icon: Network,
    color: "#db2777",
    description: "Techniques for stealing data",
    techniques: [
      {
        id: "T1041",
        name: "Exfiltration Over C2 Channel",
        severity: "high",
        description:
          "Adversaries may steal data by exfiltrating it over an existing command and control channel.",
        mitigations: [
          "Data Loss Prevention",
          "Network Intrusion Prevention",
        ],
        detection: [
          "Network traffic analysis",
          "Data volume anomalies",
          "C2 channel monitoring",
        ],
      },
      {
        id: "T1567",
        name: "Exfiltration Over Web Service",
        severity: "high",
        description:
          "Adversaries may use an existing, legitimate external Web service to exfiltrate data.",
        mitigations: [
          "Data Loss Prevention",
          "Restrict Web-Based Content",
        ],
        detection: [
          "Cloud storage uploads",
          "Unusual web service access",
          "Data transfer patterns",
        ],
      },
      {
        id: "T1048",
        name: "Exfiltration Over Alternative Protocol",
        severity: "medium",
        description:
          "Adversaries may steal data by exfiltrating it over a different protocol than that of the existing command and control channel.",
        mitigations: [
          "Data Loss Prevention",
          "Network Intrusion Prevention",
          "Network Segmentation",
        ],
        detection: [
          "Protocol anomalies",
          "DNS tunneling detection",
          "Unusual port usage",
        ],
      },
    ],
  },
  {
    id: "impact",
    name: "Impact",
    icon: AlertTriangle,
    color: "#991b1b",
    description: "Techniques for disrupting availability or integrity",
    techniques: [
      {
        id: "T1486",
        name: "Data Encrypted for Impact",
        severity: "critical",
        description:
          "Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability.",
        mitigations: [
          "Data Backup",
          "Behavior Prevention on Endpoint",
        ],
        detection: [
          "Mass file encryption",
          "Ransomware signatures",
          "Rapid file modification",
        ],
      },
      {
        id: "T1489",
        name: "Service Stop",
        severity: "high",
        description:
          "Adversaries may stop or disable services on a system to render those services unavailable to legitimate users.",
        mitigations: [
          "Network Segmentation",
          "Restrict File and Directory Permissions",
          "User Account Management",
        ],
        detection: [
          "Service state changes",
          "Critical service monitoring",
          "Dependency analysis",
        ],
      },
      {
        id: "T1485",
        name: "Data Destruction",
        severity: "critical",
        description:
          "Adversaries may destroy data and files on specific systems or in large numbers on a network.",
        mitigations: ["Data Backup"],
        detection: [
          "Mass file deletion",
          "MBR modification",
          "Disk wiping activity",
        ],
      },
    ],
  },
];

const severityColors = {
  critical: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/50" },
  high: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/50" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/50" },
  low: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/50" },
};

interface Technique {
  id: string;
  name: string;
  severity: string;
  description: string;
  mitigations: string[];
  detection: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  techniques: Technique[];
}

export function ThreatMatrixClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = useCallback((category: Category) => {
    setSelectedCategory(category);
    setSelectedTechnique(null);
  }, []);

  const handleTechniqueClick = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
  }, []);

  const closePanel = useCallback(() => {
    setSelectedTechnique(null);
    setSelectedCategory(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0d0a] text-[#F1F7ED]">
      {/* Animated background grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 157, 134, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 157, 134, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Scanning line animation */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8a9d86]/50 to-transparent"
          animate={{
            top: ["-10%", "110%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-[#262b26]/50 backdrop-blur-sm bg-[#0a0d0a]/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/security"
              className="flex items-center gap-2 text-[#8a9d86] hover:text-[#F1F7ED] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Security Research</span>
            </Link>
            <div className="h-4 w-px bg-[#262b26]" />
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-[#8a9d86]" />
              <span className="font-mono text-sm">THREAT-MATRIX-v1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#576953]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-[#8a9d86]">{">"}</span> Threat Matrix
          </h1>
          <p className="text-[#8a9d86] max-w-2xl mx-auto">
            Interactive MITRE ATT&CK-inspired visualization. Click on attack phases to explore
            techniques, mitigations, and detection strategies.
          </p>
        </motion.div>

        {/* Matrix visualization */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {threatCategories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory?.id === category.id;
            const isHovered = hoveredCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`
                  relative p-4 rounded-lg border transition-all duration-300
                  ${isSelected 
                    ? "border-[#8a9d86] bg-[#262b26]/50" 
                    : "border-[#262b26] bg-[#191D19]/50 hover:border-[#3a4438]"
                  }
                `}
              >
                {/* Glow effect on hover/select */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0"
                  style={{ 
                    background: `radial-gradient(circle at center, ${category.color}20, transparent 70%)` 
                  }}
                  animate={{ opacity: isSelected || isHovered ? 1 : 0 }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: category.color }} />
                  </div>
                  <h3 className="font-semibold text-sm text-left mb-1">{category.name}</h3>
                  <p className="text-xs text-[#576953] text-left line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-mono text-[#8a9d86]">
                      {category.techniques.length} techniques
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#576953]" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Kill chain flow visualization */}
        <div className="hidden md:flex items-center justify-center gap-1 mb-8 overflow-x-auto py-4">
          {threatCategories.map((category, index) => (
            <div key={category.id} className="flex items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center"
              >
                <div
                  className={`
                    px-3 py-1.5 rounded text-xs font-mono cursor-pointer transition-all
                    ${selectedCategory?.id === category.id 
                      ? "bg-[#8a9d86]/30 text-[#F1F7ED]" 
                      : "bg-[#262b26]/50 text-[#8a9d86] hover:bg-[#262b26]"
                    }
                  `}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </div>
                {index < threatCategories.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="w-6 h-0.5 bg-gradient-to-r from-[#576953] to-[#3a4438]"
                  />
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Technique details panel */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg border border-[#262b26] bg-[#191D19]/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-4 border-b border-[#262b26] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${selectedCategory.color}20` }}
                  >
                    <selectedCategory.icon 
                      className="w-4 h-4" 
                      style={{ color: selectedCategory.color }} 
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{selectedCategory.name}</h2>
                    <p className="text-xs text-[#8a9d86]">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="p-2 rounded hover:bg-[#262b26] transition-colors"
                >
                  <X className="w-4 h-4 text-[#576953]" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 divide-x divide-[#262b26]">
                {/* Technique list */}
                <div className="p-4">
                  <h3 className="text-xs font-mono text-[#8a9d86] mb-3 uppercase">
                    Techniques
                  </h3>
                  <div className="space-y-2">
                    {selectedCategory.techniques.map((technique) => {
                      const severity = severityColors[technique.severity as keyof typeof severityColors];
                      const isActive = selectedTechnique?.id === technique.id;
                      
                      return (
                        <button
                          key={technique.id}
                          onClick={() => handleTechniqueClick(technique)}
                          className={`
                            w-full text-left p-3 rounded border transition-all
                            ${isActive 
                              ? `${severity.bg} ${severity.border}` 
                              : "border-[#262b26] hover:border-[#3a4438]"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-xs text-[#576953]">
                              {technique.id}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${severity.bg} ${severity.text}`}>
                              {technique.severity}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{technique.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technique details */}
                <div className="md:col-span-2 p-4">
                  <AnimatePresence mode="wait">
                    {selectedTechnique ? (
                      <motion.div
                        key={selectedTechnique.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm text-[#8a9d86]">
                              {selectedTechnique.id}
                            </span>
                            <a
                              href={`https://attack.mitre.org/techniques/${selectedTechnique.id}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#576953] hover:text-[#8a9d86] transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{selectedTechnique.name}</h3>
                          <p className="text-sm text-[#8a9d86] leading-relaxed">
                            {selectedTechnique.description}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Mitigations */}
                          <div>
                            <h4 className="text-xs font-mono text-[#8a9d86] mb-3 uppercase flex items-center gap-2">
                              <Shield className="w-3 h-3" />
                              Mitigations
                            </h4>
                            <ul className="space-y-2">
                              {selectedTechnique.mitigations.map((mitigation, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="text-sm flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                  {mitigation}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Detection */}
                          <div>
                            <h4 className="text-xs font-mono text-[#8a9d86] mb-3 uppercase flex items-center gap-2">
                              <Eye className="w-3 h-3" />
                              Detection Strategies
                            </h4>
                            <ul className="space-y-2">
                              {selectedTechnique.detection.map((detection, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="text-sm flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                  {detection}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex items-center justify-center text-[#576953]"
                      >
                        <div className="text-center py-12">
                          <Bug className="w-8 h-8 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">Select a technique to view details</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Research methodology section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-lg border border-[#262b26] bg-[#191D19]/50">
            <div className="w-10 h-10 rounded-lg bg-[#8a9d86]/20 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5 text-[#8a9d86]" />
            </div>
            <h3 className="font-semibold mb-2">Methodology</h3>
            <p className="text-sm text-[#8a9d86]">
              Systematic security analysis following MITRE ATT&CK framework. Each technique
              mapped to real-world attack patterns.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#262b26] bg-[#191D19]/50">
            <div className="w-10 h-10 rounded-lg bg-[#8a9d86]/20 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#8a9d86]" />
            </div>
            <h3 className="font-semibold mb-2">Responsible Disclosure</h3>
            <p className="text-sm text-[#8a9d86]">
              All findings reported through proper channels. No technical details published
              until patches deployed.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[#262b26] bg-[#191D19]/50">
            <div className="w-10 h-10 rounded-lg bg-[#8a9d86]/20 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-[#8a9d86]" />
            </div>
            <h3 className="font-semibold mb-2">Active Research</h3>
            <p className="text-sm text-[#8a9d86]">
              Currently focused on AI/ML infrastructure security, cloud services, and
              authentication systems.
            </p>
          </div>
        </motion.section>

        {/* Footer note */}
        <p className="text-center text-xs text-[#576953] mt-12">
          Based on MITRE ATT&CK® framework. Educational reference only.
        </p>
      </main>
    </div>
  );
}
