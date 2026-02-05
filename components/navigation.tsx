"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "RESEARCH", href: "#projects" },
  { label: "INTERESTS", href: "#interests" },
  { label: "BLOG", href: "#blog" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Track active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: Floating pill navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          isScrolled ? 'scale-100' : 'scale-100'
        }`}
      >
        <div className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#262b26]/90 backdrop-blur-xl border-[#3a4438]' 
            : 'bg-[#191D19]/50 backdrop-blur-md border-[#262b26]'
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-2 text-[11px] font-medium tracking-wide-caps transition-all duration-300 rounded-full ${
                activeSection === item.href.replace('#', '')
                  ? 'bg-[#576953] text-[#F1F7ED]'
                  : 'text-[#8a9d86] hover:text-[#F1F7ED] hover:bg-[#262b26]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-1 px-4 py-2 text-[11px] font-medium tracking-wide-caps bg-[#F1F7ED] text-[#191D19] rounded-full hover:bg-[#576953] hover:text-[#F1F7ED] transition-all duration-300 flex items-center gap-1"
          >
            CONTACT
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.nav>

      {/* Mobile: Hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden w-12 h-12 rounded-full bg-[#262b26] border border-[#3a4438] flex items-center justify-center text-[#F1F7ED] hover:bg-[#3a4438] transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Mobile: Full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#191D19]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-[#F1F7ED] hover:text-[#576953] transition-colors duration-300 tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
              >
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-[#576953] hover:text-[#8a9d86] transition-colors duration-300 tracking-tight flex items-center gap-2"
                >
                  CONTACT
                  <ArrowUpRight className="w-6 h-6" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side indicator dots (desktop) - fixed alignment */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center gap-3"
          >
            <span className={`text-[10px] font-medium tracking-wide-caps opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              activeSection === item.href.replace('#', '') ? 'text-[#576953]' : 'text-[#8a9d86]'
            }`}>
              {item.label}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === item.href.replace('#', '')
                ? 'bg-[#576953] scale-125'
                : 'bg-[#3a4438] group-hover:bg-[#8a9d86]'
            }`} />
          </Link>
        ))}
      </div>
    </>
  );
}
