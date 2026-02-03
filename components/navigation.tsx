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
          ? "bg-[#0f172a]/80 backdrop-blur-lg border-b border-[#334155]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#cd7f32]/10 border border-[#cd7f32]/20 flex items-center justify-center group-hover:bg-[#cd7f32]/20 transition-colors">
              <Zap className="w-4 h-4 text-[#cd7f32]" />
            </div>
            <span className="font-semibold text-slate-100 group-hover:text-[#cd7f32] transition-colors">
              Zeke
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-[#cd7f32] transition-colors rounded-lg hover:bg-[#cd7f32]/5"
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
              className="bg-[#cd7f32] hover:bg-[#d4a574] text-[#0f172a] font-semibold"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0f172a] border-[#334155] w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-[#cd7f32]/10 border border-[#cd7f32]/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#cd7f32]" />
                  </div>
                  <span className="font-semibold text-slate-100">Zeke</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-slate-400 hover:text-[#cd7f32] hover:bg-[#cd7f32]/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button
                  asChild
                  className="bg-[#cd7f32] hover:bg-[#d4a574] text-[#0f172a] font-semibold mt-4"
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
