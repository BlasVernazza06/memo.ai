'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Loader2, ChevronRight } from "lucide-react";
import AuthDesktopButtons from "../auth/auth-desktop-buttons";
import AuthMobileButtons from "../auth/auth-mobile-buttons";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/auth-provider";
import UserModalLanding from "./user-modal-landing";

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
    const [userModal, setUserModal] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        
        // Lock scroll when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                    <div 
                        className="relative cursor-pointer group/avatar"
                        onClick={() => setUserModal(!userModal)}
                    >
                        <div className={`p-0.5 rounded-full border-2 transition-all ${userModal ? 'border-primary ring-4 ring-primary/10' : 'border-transparent group-hover/avatar:border-primary/30'}`}>
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={38}
                                    height={38}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="size-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {userModal && (
                                <UserModalLanding 
                                    user={user} 
                                    onClose={() => setUserModal(false)} 
                                />
                            )}
                        </AnimatePresence>
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
        <div 
            className={`
                mx-auto max-w-7xl h-16 pointer-events-auto
                transition-all duration-300 ease-in-out
                ${scrolled || isOpen
                    ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-white/40 rounded-2xl px-6 h-14' 
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden fixed inset-0 bg-white/40 backdrop-blur-md z-[-1] pointer-events-auto"
                        />
                        
                        {/* Menu Container */}
                        <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            className="lg:hidden absolute top-[85px] left-4 right-4 p-4 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] pointer-events-auto overflow-hidden"
                        >
                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link 
                                            href={link.href}
                                            onClick={(e) => handleScroll(e, link.href)}
                                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-black/5 group transition-colors"
                                        >
                                            <span className="text-base font-bold text-slate-800 tracking-tight">{link.name}</span>
                                            <ChevronRight className="size-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                <div className="h-px bg-black/5 my-2 mx-2" />
                                
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="pt-1"
                                >
                                    {renderMobileActions()}
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
