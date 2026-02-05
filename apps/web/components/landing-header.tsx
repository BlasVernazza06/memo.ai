'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {Menu, X} from "lucide-react";
import AuthDesktopButtons from "./auth-components/auth-desktop-buttons";
import AuthMobileButtons from "./auth-components/auth-mobile-buttons";
import { motion } from "motion/react";

const navLinks = [
    {
        name: "Características",
        href: "/#features"
    },
    {
        name: "Precios",
        href: "/#pricing"
    },
    {
        name: "Testimonios",
        href: "/#testimonials"
    }
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/logo.webp" 
                            alt="Memo.ai Logo" 
                            width={36} 
                            height={36} 
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold">Memo.ai</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className="hover:bg-accent border border-transparent hover:border-accent-foreground/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <AuthDesktopButtons />
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-2">
                    {/* Mobile Nav Links */}
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-border my-2" />
                    
                    {/* Mobile Auth Buttons */}
                    
                    <AuthMobileButtons onClose={() => setIsOpen(false)} />
                </div>
            </div>
        </header>
    );
}