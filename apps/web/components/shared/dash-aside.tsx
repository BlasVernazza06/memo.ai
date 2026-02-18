'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { 
    HelpCircle, 
    LayoutDashboard, 
    LogOut, 
    Settings,
    Loader2
} from "lucide-react";
import { motion } from "motion/react";

import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-provider";

import { getInitials } from "@/hooks/use-Initials";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard"},
    { icon: Settings, label: "Ajustes", href: "/dashboard/settings" },
];

export default function DashAside() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    const renderMobileAvatar = () => {
        if (isLoading) {
            return (
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                </div>
            );
        }

        if (user?.image) {
            return (
                <Image 
                    src={user.image} 
                    alt={user?.name ?? "Usuario"} 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />
            );
        }

        return (
            <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {getInitials(user?.name ?? "JD")}
            </div>
        );
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
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
                                <div className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${pathname === item.href ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
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
                        <Link href="/dashboard/help" className="group relative flex items-center justify-center w-12 h-12 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                            <HelpCircle className="w-5 h-5" />
                            <div className="absolute left-16 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Ayuda
                            </div>
                        </Link>
                        <button 
                            onClick={handleSignOut}
                            className="group relative flex items-center justify-center w-12 h-12 rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            <div className="absolute left-16 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Cerrar sesión
                            </div>
                        </button>
                    </div>
                </nav>
            </motion.aside>

            {/* Mobile Nav */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm">
                <nav className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-4xl p-3 flex justify-around items-center">
                    {navItems.map((item, idx) => (
                        <Link key={idx} href={item.href}>
                            <div className={`p-3 rounded-2xl transition-all ${pathname === item.href ? 'bg-primary text-white' : 'text-slate-400'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                        </Link>
                    ))}
                    <Link href="/dashboard/profile">
                        {renderMobileAvatar()}
                    </Link>
                </nav>
            </div>
        </>
    );
}