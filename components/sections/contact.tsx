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
    <section id="contact" className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-[10px] tracking-wide-caps text-[#576953] font-medium">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight-hero mt-3 sm:mt-4">
            <span className="text-[#F1F7ED]">LET&apos;S</span>
            <br />
            <span className="text-[#576953]">CONNECT</span>
          </h2>
        </motion.div>

        {/* Email CTA - big and bold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <Link
            href="mailto:zekebawt@gmail.com"
            className="group inline-flex items-center gap-2 sm:gap-4 text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#F1F7ED] hover:text-[#576953] transition-colors duration-300"
          >
            <Mail className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0" />
            <span className="break-all sm:break-normal">zekebawt@gmail.com</span>
            <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 flex-shrink-0" />
          </Link>
        </motion.div>

        {/* Social links - horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#3a4438] max-w-4xl mx-auto"
        >
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-[#191D19] p-4 sm:p-6 lg:p-8 hover:bg-[#262b26] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8a9d86] group-hover:text-[#576953] transition-colors duration-300" />
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#3a4438] group-hover:text-[#576953] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 mb-0.5 sm:mb-1">
                  {link.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#8a9d86]">{link.handle}</p>
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
          className="mt-20 sm:mt-28 lg:mt-32 pt-6 sm:pt-8 border-t border-[#3a4438] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 rounded-full bg-[#576953] animate-pulse" />
            <span className="text-[#F1F7ED] font-bold tracking-tight text-sm sm:text-base">ZEKE BAWTRY</span>
            <span className="text-[#576953] text-xs ml-2">Security Researcher</span>
          </div>
          <p className="text-[#8a9d86] text-[10px] sm:text-xs text-center">
            Built with Next.js
          </p>
          <p className="text-[#3a4438] text-[10px] sm:text-xs">
            © 2026
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements - responsive circles centered properly */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[60vw] max-w-[800px] aspect-square rounded-full border border-[#262b26] opacity-30" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[45vw] max-w-[600px] aspect-square rounded-full border border-[#262b26] opacity-20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[30vw] max-w-[400px] aspect-square rounded-full border border-[#262b26] opacity-10" />
      </div>
    </section>
  );
}
