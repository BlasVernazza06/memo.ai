'use client';

import { FileText, MessageSquare, Award, Flame, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
    { label: "Documentos", value: "48", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Flashcards", value: "1.2k", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Racha", value: "12d", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "IA", value: "320", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export function ProfileStats() {
    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATS.map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-slate-200/60 rounded-4xl p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                    <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-slate-900 leading-none">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                </motion.div>
            ))}
            
            {/* Weekly Progress */}
            <div className="md:col-span-2 bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-primary/20 to-transparent pointer-events-none" />
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold">Progreso Semanal</h3>
                        <p className="text-xs text-slate-400 font-medium">Vas un +12% mejor que la semana pasada.</p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div className="flex items-end gap-2 h-16">
                    {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group overflow-hidden">
                             <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                className="absolute bottom-0 left-0 w-full bg-primary" 
                             />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
