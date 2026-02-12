'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { 
    Bell,
    FileText, 
    HelpCircle, 
    Layers, 
    LayoutDashboard, 
    LogOut, 
    Settings 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/hooks/useInitials";
import Image from "next/image";

interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

interface DashAsideProps {
    user: User | null;
}

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Layers, label: "Workspaces", href: "/dashboard/workspaces" },
    { icon: FileText, label: "Documentos", href: "/dashboard/documentos" },
    { icon: Settings, label: "Ajustes", href: "/dashboard/settings" },
];



export default function DashAside({ user }: DashAsideProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <>
            {/* Desktop Sidebar */}
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
                        <Link href="/dashboard/help">
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                        </Link>
                        <button 
                            onClick={handleSignOut}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </nav>
            </motion.aside>

            {/* Floating User Button (top-right) */}
            <div className="fixed top-8 right-8 z-50 flex flex-col items-center gap-4">
                <div className="group relative">
                    <Link href="/dashboard/profile">
                        <button className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-1.5 pr-4 rounded-4xl hover:bg-white transition-all cursor-pointer">
                            {user?.image ? (
                                <Image 
                                    src={user.image} 
                                    alt={user.name} 
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                    {getInitials(user?.name ?? "JD")}
                                </div>
                            )}
                            <div className="hidden sm:block text-left">
                                <p className="text-[12px] font-bold text-slate-800 leading-none">{user?.name ?? "Usuario"}</p>
                                <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tight">Pro Plan</p>
                            </div>
                        </button>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl flex items-center justify-center text-slate-600 hover:bg-white transition-all">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl flex items-center justify-center text-slate-600 hover:bg-white transition-all">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </div>

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
                    <Link href="/dashboard/profile">
                        {user?.image ? (
                            <Image 
                                src={user.image} 
                                alt={user?.name ?? "Usuario"} 
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {getInitials(user?.name ?? "JD")}
                            </div>
                        )}
                    </Link>
                </nav>
            </div>
        </>
    );
}