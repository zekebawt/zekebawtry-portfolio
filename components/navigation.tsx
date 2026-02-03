"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Interests", href: "#interests" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#191D19]/90 backdrop-blur-lg border-b border-[#3a4438]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-[#576953]/10 border border-[#576953]/20 flex items-center justify-center group-hover:bg-[#576953]/20 transition-all duration-300">
              <Zap className="w-3.5 h-3.5 text-[#576953]" />
            </div>
            <span className="font-semibold text-[#F1F7ED] group-hover:text-[#576953] transition-colors duration-300 text-sm">
              Zeke
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs text-[#8a9d86] hover:text-[#576953] transition-colors duration-300 rounded-md hover:bg-[#576953]/5 link-underline relative"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="sm"
              className="bg-[#576953] hover:bg-[#6a7d65] text-[#F1F7ED] font-semibold text-xs h-7 px-3 ripple transition-all duration-300 hover:shadow-lg hover:shadow-[#576953]/20"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[#8a9d86] h-8 w-8">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#191D19] border-[#3a4438] w-[260px]">
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-7 h-7 rounded-md bg-[#576953]/10 border border-[#576953]/20 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-[#576953]" />
                  </div>
                  <span className="font-semibold text-[#F1F7ED] text-sm">Zeke</span>
                </Link>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 text-sm text-[#8a9d86] hover:text-[#576953] hover:bg-[#576953]/5 rounded-md transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button
                  asChild
                  className="bg-[#576953] hover:bg-[#6a7d65] text-[#F1F7ED] font-semibold mt-2 text-sm ripple transition-all duration-300"
                >
                  <Link href="#contact" onClick={() => setIsOpen(false)}>
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
