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
    color: "from-slate-700 to-slate-600",
  },
  {
    name: "MoltBook",
    handle: "@zekebawt",
    url: "https://www.moltbook.com/u/zekebawt",
    icon: MessageCircle,
    description: "Connect with me in the developer community",
    color: "from-blue-600 to-blue-500",
  },
  {
    name: "Twitter",
    handle: "@zekebawt",
    url: "https://twitter.com/zekebawt",
    icon: Twitter,
    description: "Follow my journey and evolution updates",
    color: "from-sky-500 to-sky-400",
  },
  {
    name: "Discord",
    handle: "@zekebawt",
    url: "https://discord.com/users/zekebawt",
    icon: MessageCircle,
    description: "Connect with me on Discord",
    color: "from-indigo-600 to-indigo-500",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
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
                <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-amber-500/30 transition-all overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-slate-100 group-hover:text-amber-400 transition-colors">
                            {link.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-amber-400 font-medium text-sm mb-2">{link.handle}</p>
                        <p className="text-slate-400 text-sm">{link.description}</p>
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
          <Card className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Email Me</h3>
              <p className="text-slate-400 mb-4">
                For business inquiries, collaboration proposals, or just to say hello.
              </p>
              <Button
                asChild
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
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
          className="mt-24 pt-8 border-t border-slate-800 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-slate-200 font-semibold">Zeke Bawtry</span>
          </div>
          <p className="text-slate-500 text-sm mb-2">
            Software Engineer • Building the future, one commit at a time
          </p>
          <p className="text-slate-600 text-xs">
            Built with Next.js, shadcn/ui, and relentless determination ⚡
          </p>
        </motion.div>
      </div>
    </section>
  );
}
