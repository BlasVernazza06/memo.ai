'use client';

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LayoutDashboard, Settings, LogOut, ChevronRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useClickOutside } from "@/hooks/use-click-outside";

interface UserModalLandingProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
    onClose: () => void;
}

export default function UserModalLanding({ user, onClose }: UserModalLandingProps) {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    // Utilizamos tu hook personalizado para cerrar el modal al hacer clic fuera o presionar Escape
    useClickOutside(modalRef, onClose);

    return (
        <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 p-2 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
        >
            {/* User Info Header */}
            <div className="p-4 border-b border-slate-50 mb-1">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] font-medium text-slate-500 truncate">{user.email}</p>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-0.5">
                <Link href="/dashboard" onClick={onClose}>
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                <LayoutDashboard className="size-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Dashboard</span>
                        </div>
                        <ChevronRight className="size-4 text-slate-300 group-hover/item:text-slate-400 transition-colors" />
                    </div>
                </Link>

                <Link href="/dashboard/settings" onClick={onClose}>
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover/item:bg-slate-900 group-hover/item:text-white transition-colors">
                                <Settings className="size-4" />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Ajustes</span>
                        </div>
                        <ChevronRight className="size-4 text-slate-300 group-hover/item:text-slate-400 transition-colors" />
                    </div>
                </Link>

                <div className="h-px bg-slate-50 my-1 mx-2" />

                <button 
                    onClick={async () => {
                        await authClient.signOut();
                        onClose();
                        router.push("/");
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors group/item cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                            <LogOut className="size-4" />
                        </div>
                        <span className="text-sm font-semibold text-red-600">Cerrar Sesión</span>
                    </div>
                </button>
            </div>
        </motion.div>
    );
}