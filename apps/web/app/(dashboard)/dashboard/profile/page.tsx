'use client';

import { motion } from "motion/react";
import { 
    Trophy, 
    Flame, 
    BookOpen, 
    Clock, 
    FileText, 
    MessageSquare, 
    Award, 
    TrendingUp, 
    Calendar,
    ChevronRight,
    Brain,
    Sparkles,
    Share2,
    Edit3
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

export default function ProfilePage() {
    const stats = [
        { label: "Documentos", value: "48", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Flashcards", value: "1.2k", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Racha", value: "12d", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
        { label: "IA", value: "320", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    const badges = [
        { name: "Cerebro de Oro", level: "Lvl 4", icon: Brain, color: "from-yellow-400 to-orange-500" },
        { name: "Lector Voraz", level: "Lvl 2", icon: BookOpen, color: "from-blue-400 to-indigo-600" },
        { name: "Velocista", level: "Lvl 5", icon: Flame, color: "from-red-400 to-pink-600" },
        { name: "Curioso Pro", level: "Lvl 1", icon: Sparkles, color: "from-violet-400 to-purple-600" },
    ];

    return (
        <div className="max-w-6xl mx-auto py-6 space-y-8">
            
            {/* Top Profile Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                
                {/* User Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:w-1/3 bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-primary/10 to-blue-500/5" />
                    
                    <div className="relative mt-4">
                        <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary to-blue-600 p-1.5 shadow-2xl shadow-primary/20">
                            <div className="w-full h-full rounded-[1.25rem] bg-white flex items-center justify-center">
                                <span className="text-5xl font-black text-primary italic">BV</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white shadow-lg">
                            <Sparkles className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blas Vernazza</h1>
                        <p className="text-sm font-bold text-primary/80 uppercase tracking-widest px-4 py-1.5 bg-primary/5 rounded-full inline-block">Pro Member</p>
                    </div>

                    <p className="mt-6 text-sm text-slate-500 font-medium leading-relaxed italic">
                        "Estudiante de Medicina optimizando el aprendizaje con IA."
                    </p>

                    <div className="w-full grid grid-cols-2 gap-3 mt-8">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 shadow-lg shadow-primary/20 flex gap-2">
                             <Edit3 className="w-4 h-4" />
                             Editar
                        </Button>
                        <Button variant="ghost" className="bg-slate-50 text-slate-400 hover:text-slate-600 font-bold rounded-2xl h-12 flex gap-2">
                             <Share2 className="w-4 h-4" />
                             Perfil
                        </Button>
                    </div>
                </motion.div>

                {/* Stats & Quick Glance */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.map((stat, i) => (
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
                    
                    {/* Weekly Progress Mockup */}
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
            </div>

            {/* Bottom Section: Achievements & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Badges/Achievements Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm space-y-8"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            Logros
                        </h3>
                        <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-widest flex gap-2">
                             Full Colección <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {badges.map((badge, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-3 group">
                                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${badge.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <div className="w-full h-full rounded-[0.9rem] bg-white flex items-center justify-center">
                                        <badge.icon className="w-8 h-8 text-slate-800" />
                                    </div>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="font-bold text-slate-900 text-xs">{badge.name}</p>
                                    <p className="text-[10px] font-black text-primary uppercase">{badge.level}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Activity Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm"
                >
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                        <Clock className="w-6 h-6 text-blue-500" />
                        Actividad
                    </h3>

                    <div className="space-y-6">
                        {[
                            { action: "Estudiaste Anatomía II", date: "Hace 20 min", icon: BookOpen, color: "text-blue-500" },
                            { action: "Creaste 24 flashcards", date: "Hace 2 horas", icon: Award, color: "text-purple-500" },
                            { action: "Subiste Marketing.pdf", date: "Ayer, 18:30", icon: FileText, color: "text-orange-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 truncate">{item.action}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5 pt-0.5">
                                        <Calendar className="w-3 h-3" />
                                        {item.date}
                                    </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
