'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, User2, X, Loader2 } from "lucide-react";
import AuthDesktopButtons from "../auth/auth-desktop-buttons";
import AuthMobileButtons from "../auth/auth-mobile-buttons";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/auth-provider";

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
    const { user, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const id = href.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const elementHeight = element.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                const offsetPosition = elementPosition - (viewportHeight / 2) + (elementHeight / 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                setIsOpen(false);
            }
        }
    };

    // Render the desktop action buttons based on auth state
    const renderDesktopActions = () => {
        if (isLoading) {
            return (
                <div className="hidden lg:flex items-center gap-4">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
            );
        }

        if (user) {
            return (
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-sm text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-3"
                        >
                            Dashboard
                        </motion.button>
                    </Link>
                    <div className="relative border border-muted-foreground/20 rounded-full overflow-hidden flex items-center justify-center">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={36}
                                height={36}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <User2 className="size-9 p-1 text-muted-foreground" />
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="hidden lg:flex items-center gap-4">
                <AuthDesktopButtons />
            </div>
        );
    };

    // Render the mobile menu actions based on auth state
    const renderMobileActions = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-4">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
            );
        }

        if (user) {
            return (
                <div className="space-y-2">
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block bg-primary text-center rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                    >
                        Ir al Dashboard
                    </Link>
                </div>
            );
        }

        return <AuthMobileButtons onClose={() => setIsOpen(false)} />;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`
                    mx-auto max-w-7xl h-16 pointer-events-auto
                    transition-all duration-300 ease-in-out
                    border border-white/10
                    ${scrolled 
                        ? 'bg-white/10 dark:bg-black/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-2xl px-6 h-14' 
                        : 'bg-transparent border-transparent rounded-none px-4'
                    }
                `}
            >
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <motion.div 
                                className="absolute -inset-1 bg-primary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <Image 
                                src="/logo.webp" 
                                alt="Memo.ai Logo" 
                                width={32} 
                                height={32} 
                                className="rounded-lg relative z-10"
                            />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">
                            memo<span className="text-primary">.ai</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                onClick={(e) => handleScroll(e, link.href)}
                                className="relative px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all group"
                            >
                                <span>{link.name}</span>
                                <motion.div 
                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-4 transition-all"
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    {renderDesktopActions()}

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-20 left-4 right-4 p-6 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border border-white/10 rounded-4xl shadow-2xl pointer-events-auto"
                    >
                        <nav className="space-y-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="block p-4 rounded-2xl hover:bg-primary/5 text-lg font-bold tracking-tight transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 mx-2" />
                            <div className="pt-2">
                                {renderMobileActions()}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
