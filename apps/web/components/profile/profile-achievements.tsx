'use client';

import { motion } from "motion/react";
import { Trophy, Brain, BookOpen, Flame, Sparkles, Lock, ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

const BADGES = [
    { name: "Cerebro de Oro", icon: Brain, color: "from-yellow-400 to-orange-500", unlocked: true },
    { name: "Lector Voraz", icon: BookOpen, color: "from-blue-400 to-indigo-600", unlocked: true },
    { name: "Velocista", icon: Flame, color: "from-red-400 to-pink-600", unlocked: true },
    { name: "Curioso Pro", icon: Sparkles, color: "from-violet-400 to-purple-600", unlocked: false },
];

export function ProfileAchievements() {
    const unlockedCount = BADGES.filter(b => b.unlocked).length;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm space-y-8"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Logros
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {unlockedCount}/{BADGES.length}
                    </span>
                </h3>
                <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-widest flex gap-2">
                     Full Colección <ChevronRight className="w-4 h-4" />
                 </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {BADGES.map((badge, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className={`flex flex-col items-center text-center gap-3 group ${!badge.unlocked ? 'opacity-40' : ''}`}
                    >
                        <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${badge.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform relative`}>
                            <div className="w-full h-full rounded-[0.9rem] bg-white flex items-center justify-center">
                                <badge.icon className="w-8 h-8 text-slate-800" />
                            </div>
                            {!badge.unlocked && (
                                <div className="absolute inset-0 rounded-2xl bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-slate-400" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 text-xs">{badge.name}</p>
                            {!badge.unlocked && (
                                <p className="text-[10px] text-slate-400 font-medium">Bloqueado</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Progress hint */}
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                    Completa <span className="font-bold text-slate-700">5 quizzes</span> para desbloquear "Curioso Pro"
                </p>
            </div>
        </motion.div>
    );
}
