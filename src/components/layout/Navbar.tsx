"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Cours", href: "/classes" },
  { label: "Abonnement", href: "/membership" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled 
          ? "bg-zen-offwhite/90 backdrop-blur-md shadow-sm border-b border-zen-stone/20" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl tracking-tight text-zen-charcoal">
          Zen Gym.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zen-charcoal/80 hover:text-zen-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="ml-4">Join Now</Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zen-charcoal"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="fixed inset-0 z-50 bg-zen-sand flex flex-col pt-20 px-6 md:hidden"
          >
            <button 
              className="absolute top-7 right-6 text-zen-charcoal"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col gap-6 mt-12 text-center">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-zen-charcoal hover:text-zen-sage transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8">
                <Button size="lg" className="w-full">Join Now</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
