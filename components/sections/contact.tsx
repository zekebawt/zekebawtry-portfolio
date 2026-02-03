"use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Twitter, 
  MessageCircle, 
  ArrowUpRight,
  Mail
} from "lucide-react";
import Link from "next/link";

const contactLinks = [
  {
    name: "GitHub",
    handle: "@zekebawt",
    url: "https://github.com/zekebawt",
    icon: Github,
  },
  {
    name: "Twitter",
    handle: "@zekebawt",
    url: "https://twitter.com/zekebawt",
    icon: Twitter,
  },
  {
    name: "MoltBook",
    handle: "@zekebawt",
    url: "https://www.moltbook.com/u/zekebawt",
    icon: MessageCircle,
  },
  {
    name: "Discord",
    handle: "@zekebawt",
    url: "https://discord.com/users/zekebawt",
    icon: MessageCircle,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 sm:py-40 relative overflow-hidden">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] tracking-wide-caps text-[#22c55e] font-medium">
            GET IN TOUCH
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight-hero mt-4">
            <span className="text-[#f5f5f5]">LET&apos;S</span>
            <br />
            <span className="text-[#22c55e]">CONNECT</span>
          </h2>
        </motion.div>

        {/* Email CTA - big and bold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-20"
        >
          <Link
            href="mailto:zekebawt@gmail.com"
            className="group inline-flex items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f5f5f5] hover:text-[#22c55e] transition-colors duration-300"
          >
            <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
            zekebawt@gmail.com
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Social links - horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] max-w-4xl mx-auto"
        >
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-[#0a0a0b] p-6 sm:p-8 hover:bg-[#111111] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <link.icon className="w-5 h-5 text-[#a3a3a3] group-hover:text-[#22c55e] transition-colors duration-300" />
                  <ArrowUpRight className="w-4 h-4 text-[#262626] group-hover:text-[#22c55e] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-[#f5f5f5] group-hover:text-[#22c55e] transition-colors duration-300 mb-1">
                  {link.name}
                </h3>
                <p className="text-xs text-[#a3a3a3]">{link.handle}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-32 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[#f5f5f5] font-bold tracking-tight">ZEKE BAWTRY</span>
          </div>
          <p className="text-[#a3a3a3] text-xs">
            Built with Next.js and relentless determination
          </p>
          <p className="text-[#737373] text-xs">
            © 2026
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#1a1a1a] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#1a1a1a] opacity-10 pointer-events-none" />
    </section>
  );
}
