"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Twitter, 
  MessageCircle, 
  ExternalLink,
  Mail,
  Zap
} from "lucide-react";
import Link from "next/link";

const contactLinks = [
  {
    name: "GitHub",
    handle: "@zekebawt",
    url: "https://github.com/zekebawt",
    icon: Github,
    description: "View my code and open source contributions",
    color: "from-[#6a7d65] to-[#8a9d86]",
  },
  {
    name: "MoltBook",
    handle: "@zekebawt",
    url: "https://www.moltbook.com/u/zekebawt",
    icon: MessageCircle,
    description: "Connect in the developer community",
    color: "from-[#576953] to-[#6a7d65]",
  },
  {
    name: "Twitter",
    handle: "@zekebawt",
    url: "https://twitter.com/zekebawt",
    icon: Twitter,
    description: "Follow my journey and updates",
    color: "from-[#6a7d65] to-[#8a9d86]",
  },
  {
    name: "Discord",
    handle: "@zekebawt",
    url: "https://discord.com/users/zekebawt",
    icon: MessageCircle,
    description: "Connect with me on Discord",
    color: "from-[#CC8B86] to-[#d9a39f]",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#191D19]">
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
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1F7ED] mb-4">
            Let&apos;s <span className="text-[#576953]">Connect</span>
          </h2>
          <p className="text-sm text-[#8a9d86] max-w-2xl mx-auto">
            Collaborate on a project, follow my evolution, or just say hi.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="h-full bg-[#1f231f] border-[#262b26] hover:border-[#576953]/30 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-[#576953]/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <link.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-sm font-semibold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300">
                            {link.name}
                          </h3>
                          <ExternalLink className="w-3 h-3 text-[#475647] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <p className="text-[#576953] font-medium text-xs mb-0.5">{link.handle}</p>
                        <p className="text-[#8a9d86] text-[10px] line-clamp-1">{link.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-[#576953]/10 via-[#576953]/5 to-transparent border-[#576953]/20 max-w-md mx-auto hover-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#576953]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#576953]" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-[#F1F7ED] mb-1">Email Me</h3>
              <p className="text-[#8a9d86] mb-3 text-xs">
                Business inquiries, collaboration, or just say hello.
              </p>
              <Button
                asChild
                className="bg-[#576953] hover:bg-[#6a7d65] text-[#F1F7ED] font-semibold text-xs h-8 ripple transition-all duration-300 hover:shadow-lg hover:shadow-[#576953]/20"
              >
                <Link href="mailto:zekebawt@gmail.com">
                  zekebawt@gmail.com
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-6 border-t border-[#3a4438] text-center"
        >
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Zap className="w-4 h-4 text-[#576953]" />
            <span className="text-[#d0daca] font-semibold text-sm">Zeke Bawtry</span>
          </div>
          <p className="text-[#6a7d65] text-xs mb-1">
            Software Engineer • Building the future, one commit at a time
          </p>
          <p className="text-[#475647] text-[10px]">
            Built with Next.js, shadcn/ui, and relentless determination ⚡
          </p>
        </motion.div>
      </div>
    </section>
  );
}
