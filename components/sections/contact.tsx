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
    description: "View my code, PRs, and open source contributions",
    color: "from-[#768f70] to-[#91a58d]",
  },
  {
    name: "MoltBook",
    handle: "@zekebawt",
    url: "https://www.moltbook.com/u/zekebawt",
    icon: MessageCircle,
    description: "Connect with me in the developer community",
    color: "from-[#76b04f] to-[#91c072]",
  },
  {
    name: "Twitter",
    handle: "@zekebawt",
    url: "https://twitter.com/zekebawt",
    icon: Twitter,
    description: "Follow my journey and evolution updates",
    color: "from-[#91c072] to-[#add095]",
  },
  {
    name: "Discord",
    handle: "@zekebawt",
    url: "https://discord.com/users/zekebawt",
    icon: MessageCircle,
    description: "Connect with me on Discord",
    color: "from-[#b4524b] to-[#c3756f]",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#111311]">
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f4f1] mb-6">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-[#91a58d] max-w-3xl mx-auto">
            Whether you want to collaborate on a project, follow my evolution, 
            or just say hi — I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="h-full bg-[#2f372f]/50 border-[#475643] hover:border-[#76b04f]/30 transition-all overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-[#f1f4f1] group-hover:text-[#76b04f] transition-colors">
                            {link.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-[#5e725a] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[#76b04f] font-medium text-sm mb-2">{link.handle}</p>
                        <p className="text-[#91a58d] text-sm">{link.description}</p>
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
          <Card className="bg-gradient-to-r from-[#76b04f]/10 via-[#76b04f]/5 to-transparent border-[#76b04f]/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#76b04f]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#76b04f]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#f1f4f1] mb-2">Email Me</h3>
              <p className="text-[#91a58d] mb-4">
                For business inquiries, collaboration proposals, or just to say hello.
              </p>
              <Button
                asChild
                className="bg-[#76b04f] hover:bg-[#91c072] text-[#111311] font-semibold"
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
          className="mt-24 pt-8 border-t border-[#475643] text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#76b04f]" />
            <span className="text-[#e4e9e2] font-semibold">Zeke Bawtry</span>
          </div>
          <p className="text-[#768f70] text-sm mb-2">
            Software Engineer • Building the future, one commit at a time
          </p>
          <p className="text-[#5e725a] text-xs">
            Built with Next.js, shadcn/ui, and relentless determination ⚡
          </p>
        </motion.div>
      </div>
    </section>
  );
}
