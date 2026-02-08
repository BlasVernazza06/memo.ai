'use client';

import { ReactNode } from "react";
import { 
    LayoutDashboard, 
    FileText, 
    Layers, 
    Settings, 
    HelpCircle, 
    LogOut,
    Bell
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
        { icon: Layers, label: "Workspaces", href: "/workspaces" },
        { icon: FileText, label: "Documentos", href: "/documentos" },
        { icon: Settings, label: "Ajustes", href: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-primary/10 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div 
                    className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" 
                    style={{ background: 'hsla(199, 89%, 48%, 0.4)' }}
                />
                <div 
                    className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
                    style={{ background: 'hsla(217, 91%, 60%, 0.4)' }}
                />
            </div>

            {/* Unconventional Floating Sidebar */}
            <motion.aside 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
            >
                <nav className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-4xl p-4 flex flex-col items-center gap-6 py-8 w-20">
                    <Link href="/" className="mb-4">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg shadow-primary/20">
                            <span className="text-white text-xl font-black italic">m.</span>
                        </div>
                    </Link>

                    <div className="flex flex-col gap-4 flex-1">
                        {navItems.map((item, idx) => (
                            <Link key={idx} href={item.href}>
                                <div className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
                                    <item.icon className="w-5 h-5" />
                                    {/* Tooltip */}
                                    <div className="absolute left-16 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.label}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t border-slate-100">
                        <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-50 transition-all">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </nav>
            </motion.aside>

            {/* Floating User Button */}
            <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
                <button className="w-12 h-12 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl flex items-center justify-center text-slate-600 hover:bg-white transition-all">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="group relative">
                    <button className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-1.5 pr-4 rounded-4xl hover:bg-white transition-all">
                        <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                            BV
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-[12px] font-bold text-slate-800 leading-none">Blas Vernazza</p>
                            <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tight">Pro Plan</p>
                        </div>
                    </button>
                    {/* Minimal Dropdown (Hidden for now) */}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="lg:pl-32 pt-10 min-h-screen relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
                    {children}
                </div>
            </main>

            {/* Mobile Nav */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
                <nav className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-4xl p-3 flex justify-around items-center">
                    {navItems.map((item, idx) => (
                        <Link key={idx} href={item.href}>
                            <div className={`p-3 rounded-2xl transition-all ${item.active ? 'bg-primary text-white' : 'text-slate-400'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                        </Link>
                    ))}
                    <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        BV
                    </div>
                </nav>
            </div>
        </div>
    );
}
